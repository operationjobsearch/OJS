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

// TODO: find a balance between smoothness and responsiveness using
// interpolation, look ahead, easing, etc
export const moveCamera = (
  camera: THREE.Camera,
  cameraRadius: number,
  cameraLookAtOffset: number,
  cameraVerticalOffset: number,
  cameraAngleTheta: number,
  cameraAnglePhi: number,
  rigidBody: React.RefObject<RapierRigidBody> | null,
  dampingFactor: number
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

  // Smoothly interpolate to the target position
  camera.position.x += (x - camera.position.x) * dampingFactor;
  camera.position.y += (y - camera.position.y) * dampingFactor;
  camera.position.z += (z - camera.position.z) * dampingFactor;

  // Interpolate the lookAt target
  const lookAtTarget = new THREE.Vector3(
    rigidBodyPos.x,
    rigidBodyPos.y + cameraLookAtOffset,
    rigidBodyPos.z
  );

  camera.lookAt(
    new THREE.Vector3(
      camera.position.x + (lookAtTarget.x - camera.position.x) * dampingFactor,
      camera.position.y + (lookAtTarget.y - camera.position.y) * dampingFactor,
      camera.position.z + (lookAtTarget.z - camera.position.z) * dampingFactor
    )
  );
  // camera.lookAt(lookAtTarget);
};
