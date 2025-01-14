import * as THREE from "three";
import { ProjectileProps } from "../types";
import { RapierRigidBody } from "@react-three/rapier";

export const createProjectile = (
  rigidBody: React.RefObject<RapierRigidBody> | null,
  projectileVelocity: number,
  camera: THREE.Camera,
  isFriendly: boolean
): ProjectileProps => {
  const cameraDir = new THREE.Vector3();
  camera.getWorldDirection(cameraDir);

  const playerPos = rigidBody!.current!.translation();
  const projectilePos = new THREE.Vector3(
    playerPos.x,
    playerPos.y,
    playerPos.z
  );
  projectilePos.addScaledVector(cameraDir, 1);

  return {
    id: Date.now(),
    position: projectilePos,
    direction: cameraDir,
    velocity: projectileVelocity,
    isFriendly: isFriendly,
  };
};
