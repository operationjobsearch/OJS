import * as THREE from "three";
import { Coordinate } from "../..";
import { RapierRigidBody } from "@react-three/rapier";

export const updateTheta = (
  mouseMovement: Coordinate,
  θ: number,
  cameraSpeedRatio: number,
  frameTime: number
): number => {
  const mouseFrameTimeX = -mouseMovement.x * cameraSpeedRatio;
  mouseMovement.x = 0;

  const newTheta = θ + mouseFrameTimeX * frameTime;
  return newTheta;
};

export const updatePhi = (
  mouseMovement: Coordinate,
  φ: number,
  cameraSpeedRatio: number,
  frameTime: number
): number => {
  const mouseFrameTimeY = mouseMovement.y * cameraSpeedRatio;
  mouseMovement.y = 0;

  const newPhi = Math.max(
    -Math.PI / 3,
    Math.min(Math.PI / 3, φ + mouseFrameTimeY * frameTime)
  );
  return newPhi;
};

// TODO: find a balance between smoothness and responsiveness using
// interpolation, look ahead, easing, etc
export const moveCamera = (
  camera: THREE.Camera,
  cameraRadius: number,
  lookAtOffsetY: number,
  positionOffsetY: number,
  θ: number,
  φ: number,
  rigidBody: React.RefObject<RapierRigidBody> | null,
  dampingFactor: number
): void => {
  if (!(rigidBody && rigidBody.current)) return;

  // Calculate the new camera position using spherical coordinates
  const rigidBodyPos = rigidBody.current.translation();

  const x = rigidBodyPos.x + cameraRadius * Math.sin(θ) * Math.cos(φ);
  const y = rigidBodyPos.y + cameraRadius * Math.sin(φ) + positionOffsetY;
  const z = rigidBodyPos.z + cameraRadius * Math.cos(θ) * Math.cos(φ);

  // Smoothly interpolate to the target position
  camera.position.x += (x - camera.position.x) * dampingFactor;
  camera.position.y += (y - camera.position.y) * dampingFactor;
  camera.position.z += (z - camera.position.z) * dampingFactor;

  // Interpolate the lookAt target
  const lookAtTarget = new THREE.Vector3(
    rigidBodyPos.x,
    rigidBodyPos.y + lookAtOffsetY,
    rigidBodyPos.z
  );

  camera.lookAt(
    new THREE.Vector3(
      camera.position.x + (lookAtTarget.x - camera.position.x) * dampingFactor,
      camera.position.y + (lookAtTarget.y - camera.position.y) * dampingFactor,
      camera.position.z + (lookAtTarget.z - camera.position.z) * dampingFactor
    )
  );
};
