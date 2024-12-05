import * as THREE from "three";
import { PlayerObject, ProjectileProps } from "../types";

export const createProjectile = (
  player: PlayerObject,
  camera: THREE.Camera,
  isFriendly: boolean
): ProjectileProps => {
  const cameraDir = new THREE.Vector3();
  camera.getWorldDirection(cameraDir);

  const playerPos = player.rigidBody.current!.translation();
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
    velocity: player.projectileVelocity,
    isFriendly: isFriendly,
  };
};
