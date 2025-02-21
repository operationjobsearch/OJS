import { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { AttackConfig, AttackTypes, ProjectileProps, useGameStore, usePlayerStore } from '../../..';
import { RapierRigidBody } from '@react-three/rapier';

export const PlayerCombat = () => {
  const {
    chargeStartTime,
    shouldFireSecondary,
    rigidBody,
    aimDirection,
    isFiringPrimary,
    isChargingSecondary,
    lastAttack,
    attackSpeed,
    setLastAttack,
    setIsFiringPrimary,
    setIsChargingSecondary,
    setShouldFireSecondary,
    setChargeStartTime,
    setAimDirection,
  } = usePlayerStore();
  const { isPaused, spawnProjectile } = useGameStore();
  const { camera } = useThree();

  const getChargedAttackDamage = (chargeStartTime: number): number => {
    const attackStats = AttackConfig[AttackTypes.Secondary];
    const chargeDuration = (performance.now() - chargeStartTime) / 1000;
    console.log('charge time', chargeDuration);
    const chargeMultiplier = Math.min(chargeDuration, attackStats.chargeMultiplier!);

    return attackStats.baseDamage * chargeMultiplier;
  };

  const canFirePrimaryAttack = (
    isFiringPrimary: boolean,
    isChargingSecondary: boolean,
    lastAttack: number,
    attackSpeed: number
  ): boolean => {
    const elapsedTime = (performance.now() - lastAttack) / 1000;
    const offCooldown = elapsedTime >= 1 / attackSpeed;
    return offCooldown && isFiringPrimary && !isChargingSecondary;
  };

  const createAllyProjectile = (
    playerRb: React.RefObject<RapierRigidBody> | null,
    attackDirection: THREE.Vector3,
    attackType: AttackTypes
  ): ProjectileProps => {
    if (!playerRb?.current) return null!;

    const playerPos = new THREE.Vector3(
      playerRb.current.translation().x,
      playerRb.current.translation().y + AttackConfig[attackType].verticalOffset!,
      playerRb.current.translation().z
    );

    const direction = new THREE.Vector3();
    direction.subVectors(attackDirection, playerPos).normalize();

    // Offset projectile start position so it doesn't spawn inside player
    const spawnPosition = playerPos
      .clone()
      .addScaledVector(direction, AttackConfig[attackType].spawnOffset!);

    return {
      id: `projectile-${Date.now()}-${Math.random() * 100}`,
      position: spawnPosition,
      direction: direction,
      velocity: AttackConfig[attackType].velocity!,
      name: attackType.toString(),
      type: attackType,
      isFriendly: true,
      // TODO: reconfigure for secondary charge attack
      damage: AttackConfig[attackType].baseDamage,
    };
  };

  const getCursorDirection = (event: MouseEvent) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const targetWorldPos = new THREE.Vector3();
    raycaster.ray.intersectPlane(groundPlane, targetWorldPos);

    return targetWorldPos;
  };

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) setIsFiringPrimary(false);
      if (e.button === 2) {
        setIsChargingSecondary(false);
        setShouldFireSecondary(true);
      }
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (!rigidBody || !rigidBody.current) return;

      const playerPos = rigidBody.current.translation();
      setAimDirection(getCursorDirection(e));
      if (e.button === 0) setIsFiringPrimary(true);
      if (e.button === 2) {
        setChargeStartTime(performance.now());
        setIsChargingSecondary(true);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [rigidBody, aimDirection]);

  useEffect(() => {
    if (!isPaused && shouldFireSecondary) {
      // const dmg = getChargedAttackDamage(chargeStartTime);
      // console.log('secondary atk damage', dmg);
      setShouldFireSecondary(false);
    }
  }, [shouldFireSecondary, chargeStartTime, isPaused]);

  useFrame((state, delta) => {
    if (isPaused) return;

    if (canFirePrimaryAttack(isFiringPrimary, isChargingSecondary, lastAttack, attackSpeed)) {
      setLastAttack(performance.now());
      spawnProjectile(createAllyProjectile(rigidBody, aimDirection, AttackTypes.Primary));
    }
  });

  return null;
};
