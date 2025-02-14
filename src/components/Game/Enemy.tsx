import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { CollisionGroups, EnemyProps, useGameStore } from '../..';
import { useGLTF } from '@react-three/drei';
import { interactionGroups, RapierRigidBody, RigidBody } from '@react-three/rapier';
import {
  createEnemyProjectile,
  EnemyFactory,
  useEnemyStore,
  usePlayerStore,
  useAttackStore,
} from '../..';
import { useFrame, useThree } from '@react-three/fiber';

export const Enemy = ({ id, rigidBody, position, attackSpeed, attackType }: EnemyProps) => {
  const { isPaused } = useGameStore();
  const playerRb = usePlayerStore((p) => p.rigidBody);
  const { setEnemyRb } = useEnemyStore();
  // TODO: move projectile velocity to attack stats
  const { projectileOffset, projectileVerticalOffset, projectileVelocity, spawnProjectile } =
    useAttackStore();

  // TODO: replace hamburger stand-in with game appropriate enemy models when available
  const { scene } = useGLTF('./hamburger.glb');
  const { camera } = useThree();
  const hitTimer = useRef(0);
  const rb = useRef<RapierRigidBody>(null);
  const enemyModel = useRef<THREE.Group>(scene.clone());
  const healthBarRef = useRef<THREE.Mesh>(null);
  const lastAttackTime = useRef<number>(performance.now());
  const enemy = useEnemyStore((state) => state.enemies.find((e) => e.id === id));
  const originalEmissiveColors = useRef<Map<THREE.Mesh, THREE.Color>>(new Map());

  useEffect(() => {
    // console.log('init enemy: ', id);
    enemyModel.current.traverse((m) => {
      if (m instanceof THREE.Mesh && m.material instanceof THREE.MeshStandardMaterial) {
        m.material = m.material.clone();
        m.userData.enemyId = id;
        originalEmissiveColors.current.set(m, m.material.emissive.clone());
        m.material.emissiveIntensity = 0;
      }
    });

    setEnemyRb(id, rb);
  }, []);

  useEffect(() => {
    if (!enemy) return;
    hitTimer.current = 0.2;
  }, [enemy?.health]);

  useFrame((_, delta) => {
    if (
      !enemy ||
      !enemyModel.current ||
      !healthBarRef.current ||
      !playerRb?.current ||
      !rb.current ||
      isPaused
    )
      return;
    // console.log('enemy not paused');

    const now = performance.now();
    const elapsedTime = (now - lastAttackTime.current) / 1000;

    if (elapsedTime >= 1 / attackSpeed) {
      const projectile = createEnemyProjectile(
        rb,
        playerRb,
        projectileVelocity,
        projectileOffset,
        projectileVerticalOffset,
        attackType
      );
      spawnProjectile(projectile);
      lastAttackTime.current = now; // Reset attack cooldown
    }

    enemyModel.current.traverse((m) => {
      if (
        m instanceof THREE.Mesh &&
        m.material instanceof THREE.MeshStandardMaterial &&
        m.userData.enemyId === id
      ) {
        if (hitTimer.current > 0) {
          hitTimer.current -= delta;
          m.material.emissive.set(new THREE.Color('rgb(138, 3, 3)'));
          m.material.emissiveIntensity = 10.0;
        } else {
          m.material.emissive.copy(
            originalEmissiveColors.current.get(m) || new THREE.Color('rgb(0, 0, 0)')
          );
          m.material.emissiveIntensity = 0;
        }
      }
    });

    const enemyPosition = rb.current.translation();
    // TODO: set enemy health bar offset variable instead of magic number
    healthBarRef.current.position.set(enemyPosition.x, enemyPosition.y + 0.75, enemyPosition.z);
    healthBarRef.current.lookAt(camera.position);

    if (healthBarRef.current && healthBarRef.current.material instanceof THREE.MeshBasicMaterial) {
      const healthPercentage = enemy.health / 100; // Assuming max health = 100 => TODO: update to be based on enemy type
      healthBarRef.current.scale.x = healthPercentage;
      healthBarRef.current.material.color.set(
        healthPercentage > 0.75 ? 'green' : healthPercentage > 0.5 ? 'yellow' : 'red'
      );
    }
  });

  return (
    <>
      <RigidBody
        ref={rb}
        lockRotations={true}
        colliders={'cuboid'}
        position={position}
        collisionGroups={interactionGroups(CollisionGroups.Enemy, CollisionGroups.PlayerProjectile)}
      >
        <primitive ref={enemyModel} object={enemyModel.current} scale={0.1} rotation-y={Math.PI} />
      </RigidBody>

      <mesh ref={healthBarRef} position={[position.x, position.y + 0.5, position.z]}>
        <planeGeometry args={[1, 0.1]} />
        <meshBasicMaterial color="green" />
      </mesh>
    </>
  );
};
