import * as THREE from "three";
import { Coordinate } from "../..";
import { RapierRigidBody } from "@react-three/rapier";

export const updateCameraAngleTheta = (
  mouseMovement: Coordinate,
  cameraAngleTheta: number,
  cameraSpeedRatio: number,
  frameTime: number
): number => {
  const mouseFrameTimeX = -mouseMovement.x * cameraSpeedRatio;
  mouseMovement.x = 0;

  const newTheta = cameraAngleTheta + mouseFrameTimeX * frameTime;
  return newTheta;
};

export const updateCameraAnglePhi = (
  mouseMovement: Coordinate,
  cameraAnglePhi: number,
  cameraSpeedRatio: number,
  frameTime: number
): number => {
  const mouseFrameTimeY = mouseMovement.y * cameraSpeedRatio;
  mouseMovement.y = 0;

  const newPhi = Math.max(
    -Math.PI / 3,
    Math.min(Math.PI / 3, cameraAnglePhi + mouseFrameTimeY * frameTime)
  );
  return newPhi;
};

export const moveCamera = (
  camera: THREE.Camera,
  cameraRadius: number,
  cameraLookAtOffset: number,
  cameraVerticalOffset: number,
  cameraAngleTheta: number,
  cameraAnglePhi: number,
  rigidBody: React.RefObject<RapierRigidBody> | null
): void => {
  if (
    !(
      (rigidBody && rigidBody.current) //&&
      //game.isPointerLocked &&
      //game.isWindowActive
    )
  )
    return;

  // Calculate the new camera position using spherical coordinates
  const rigidBodyPos = rigidBody.current.translation();

  const x =
    rigidBodyPos.x +
    cameraRadius * Math.sin(cameraAngleTheta) * Math.cos(cameraAnglePhi);
  const y =
    rigidBodyPos.y +
    cameraRadius * Math.sin(cameraAnglePhi) +
    cameraVerticalOffset;
  const z =
    rigidBodyPos.z +
    cameraRadius * Math.cos(cameraAngleTheta) * Math.cos(cameraAnglePhi);

  camera.position.set(x, y, z);

  // Make the camera look slightly above the player's head
  const lookAtPosition = new THREE.Vector3(
    rigidBodyPos.x,
    rigidBodyPos.y + cameraLookAtOffset,
    rigidBodyPos.z
  );

  camera.lookAt(lookAtPosition);
};
