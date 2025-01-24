import * as THREE from "three";
import { ProjectileProps } from "../types";
import { RapierRigidBody } from "@react-three/rapier";

export const createProjectile = (
  rigidBody: React.RefObject<RapierRigidBody> | null,
  projectileVelocity: number,
  projectileOffset: number,
  camera: THREE.Camera,
  reticle: THREE.Object3D,
  isFriendly: boolean
): ProjectileProps => {
  const playerPos = rigidBody!.current!.translation();
  const projectilePos = new THREE.Vector3(
    playerPos.x,
    reticle.position.y,
    playerPos.z
  );

  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  projectilePos.addScaledVector(direction, projectileOffset);
  return {
    id: Date.now(),
    position: projectilePos,
    direction: direction,
    velocity: projectileVelocity,
    isFriendly: isFriendly,
  };
};
