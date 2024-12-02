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
    const projectileVector = new THREE.Vector3();
    projectileVector.add(direction);
    projectileVector.normalize().multiplyScalar(5);
    projectileRigidBody.current?.setLinvel(projectileVector, true);

    const timeout = setTimeout(() => {
      if (onExpire) onExpire();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <RigidBody
      ref={projectileRigidBody}
      colliders="ball"
      lockRotations={true}
      gravityScale={0}
      position={position}
    >
      <mesh ref={projectileModel}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};
