import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { CollisionGroups, EnemyProps, useGameStore } from '..';
import { useGLTF } from '@react-three/drei';
import { interactionGroups, RapierRigidBody, RigidBody } from '@react-three/rapier';
import {
  createEnemyProjectile,
  EnemyFactory,
  useEnemyStore,
  usePlayerStore,
  useAttackStore,
} from '..';
import { useFrame } from '@react-three/fiber';

export const Enemy = ({ id, rigidBody, position, attackSpeed, attackType }: EnemyProps) => {
  const { isPaused } = useGameStore();
  const playerRb = usePlayerStore((p) => p.rigidBody);
  const { setEnemyRb } = useEnemyStore();
  const { projectileOffset, projectileVerticalOffset, projectileVelocity, spawnProjectile } =
    useAttackStore();

  const rb = useRef<RapierRigidBody>(null);
  // TODO: replace hamburger stand-in with game appropriate enemy models when available
  const baseModel = useGLTF('./hamburger.glb');
  const enemyModel = useRef<THREE.Group>(baseModel.scene.clone());
  const lastAttackTime = useRef<number>(performance.now());

  useEffect(() => {
    // console.log('init enemy: ', id);
    enemyModel.current.traverse((c) => {
      if (c instanceof THREE.Mesh) c.userData.enemyId = id;
    });

    setEnemyRb(id, rb);
  }, []);

  useFrame(() => {
    if (!playerRb?.current || !rb.current || isPaused) return;
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
    </>
  );
};
