import * as THREE from "three";
import { ProjectileProps } from "../types";
import { RapierRigidBody } from "@react-three/rapier";

export const createProjectile = (
  rigidBody: React.RefObject<RapierRigidBody> | null,
  projectileVelocity: number,
  projectileOffset: number,
  reticle: THREE.Object3D,
  isFriendly: boolean
): ProjectileProps => {
  const rigidBodyPos = rigidBody!.current!.translation();
  const playerPos = new THREE.Vector3(
    rigidBodyPos.x,
    rigidBodyPos.y,
    rigidBodyPos.z
  );

  // Compute direction vector from player to reticle
  const reticleWorldPos = new THREE.Vector3();
  reticle.getWorldPosition(reticleWorldPos);

  const direction = new THREE.Vector3()
    .subVectors(reticleWorldPos, playerPos)
    .normalize();

  // Offset projectile start position so it doesn't spawn inside player
  const spawnPosition = playerPos
    .clone()
    .addScaledVector(direction, projectileOffset);

  return {
    id: Date.now(),
    position: spawnPosition,
    direction: direction,
    velocity: projectileVelocity,
    isFriendly: isFriendly,
  };
};
