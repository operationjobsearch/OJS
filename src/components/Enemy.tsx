import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { EnemyProps, EnemyTypes } from "..";
import { useGLTF } from "@react-three/drei";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import {
  createEnemyProjectile,
  EnemyFactory,
  useEnemyStore,
  usePlayerStore,
  useAttackStore,
} from "..";
import { useFrame } from "@react-three/fiber";

export const Enemy = ({ id, rigidBody, position, attackSpeed }: EnemyProps) => {
  const enemyModel = useGLTF("./hamburger.glb");
  const rb = useRef<RapierRigidBody>(null);
  const playerRb = usePlayerStore((p) => p.rigidBody);
  const { handleCollisions, setEnemyRb } = useEnemyStore();
  const { spawnProjectile } = useAttackStore();

  useEffect(() => {
    // set id on
    if (enemyModel.scene) {
      enemyModel.scene.traverse((c) => {
        if (c instanceof THREE.Mesh) c.userData.enemyId = id;
      });
    }

    setEnemyRb(id, rb);
  }, [rigidBody, enemyModel, id]);

  useFrame((state) => {});

  return (
    <>
      <RigidBody
        ref={rb}
        lockRotations={true}
        colliders={"cuboid"}
        position={position}
        onCollisionEnter={(o) => handleCollisions(id, o, true)}
        onCollisionExit={(o) => handleCollisions(id, o, false)}
      >
        <primitive object={enemyModel.scene} scale={0.1} rotation-y={Math.PI} />
      </RigidBody>
    </>
  );
};
