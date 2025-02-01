import * as THREE from "three";
import { useEffect, useRef } from "react";
import { EnemyProps } from "..";
import { useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import {
  createEnemyProjectile,
  EnemyFactory,
  useEnemyStore,
  usePlayerStore,
  useAttackStore,
} from "..";
import { useFrame } from "@react-three/fiber";

export const Enemy = ({ id, rigidBody, position, attackSpeed }: EnemyProps) => {
  const { spawnProjectile } = useAttackStore();
  const playerRb = usePlayerStore((p) => p.rigidBody);
  const { handleCollisions, setEnemyRb } = useEnemyStore();

  const rb = useRef<RapierRigidBody>(null);
  const baseModel = useGLTF("./hamburger.glb");
  const enemyModel = useRef<THREE.Group>(baseModel.scene.clone());
  const lastAttackTime = useRef<number>(performance.now());

  useEffect(() => {
    console.log("init enemy: ", id);
    enemyModel.current.traverse((c) => {
      if (c instanceof THREE.Mesh) {
        c.userData.enemyId = id;
      }
    });

    setEnemyRb(id, rb);
  }, []);

  useFrame(() => {
    if (!playerRb?.current || !rb.current) return;

    const now = performance.now();
    const elapsedTime = (now - lastAttackTime.current) / 1000;

    if (elapsedTime >= 1 / attackSpeed) {
      const projectile = createEnemyProjectile(rb, playerRb, 10, 1);
      // spawnProjectile(projectile);
      lastAttackTime.current = now; // Reset attack cooldown
    }
  });

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
        <primitive
          ref={enemyModel}
          object={enemyModel.current}
          scale={0.1}
          rotation-y={Math.PI}
        />
      </RigidBody>
    </>
  );
};
