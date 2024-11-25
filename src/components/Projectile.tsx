import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ProjectileProps } from "../lib/types";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

export const Projectile = ({
  position,
  direction,
  velocity,
  isFriendly,
  onExpire,
}: ProjectileProps) => {
  const projectileRigidBody = useRef<RapierRigidBody>(null);
  const projectileModel = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {});

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onExpire) onExpire();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <RigidBody ref={projectileRigidBody} colliders="ball">
      <mesh ref={projectileModel}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};
