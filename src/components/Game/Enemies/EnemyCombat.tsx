import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AttackConfig, AttackTypes, EnemyProps, useGameStore, usePlayerStore } from '../../..';
import { RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

export const EnemyCombat = ({ id, rigidBody, attackSpeed, attackType }: EnemyProps) => {
  const { isPaused, spawnProjectile } = useGameStore();
  const playerRb = usePlayerStore((p) => p.rigidBody);
  const lastAttackTime = useRef(performance.now());

  const createEnemyProjectile = (
    creatorRb: React.RefObject<RapierRigidBody>,
    attackType: AttackTypes
  ) => {
    if (!creatorRb?.current || !playerRb?.current) return null;

    const attackStats = AttackConfig[attackType];

    const playerPos = new THREE.Vector3(
      playerRb.current.translation().x,
      playerRb.current.translation().y + (attackStats.verticalOffset ?? 0),
      playerRb.current.translation().z
    );

    const creatorPos = new THREE.Vector3(
      creatorRb.current.translation().x,
      creatorRb.current.translation().y,
      creatorRb.current.translation().z
    );

    const direction = new THREE.Vector3();
    direction.subVectors(playerPos, creatorPos).normalize();

    const spawnPosition = creatorPos
      .clone()
      .addScaledVector(direction, attackStats.spawnOffset ?? 0);

    return {
      id: `projectile-${Date.now()}-${Math.random() * 100}`,
      position: spawnPosition,
      direction: direction,
      velocity: attackStats.velocity,
      name: attackStats.type.toString(),
      type: attackStats.type,
      damage: attackStats.baseDamage,
      isFriendly: false,
    };
  };

  useFrame(() => {
    if (isPaused || !rigidBody?.current || !playerRb?.current) return;

    const now = performance.now();
    const elapsedTime = (now - lastAttackTime.current) / 1000;

    if (elapsedTime >= 1 / attackSpeed) {
      const projectile = createEnemyProjectile(rigidBody, attackType);
      //   console.log(projectile);
      if (projectile) spawnProjectile(projectile);
      lastAttackTime.current = now;
    }
  });

  return null;
};
