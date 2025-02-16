import * as THREE from 'three';
import { Coordinate } from '..';
import { RapierRigidBody } from '@react-three/rapier';

export const updateTheta = (
  mouseMovement: Coordinate,
  θ: number,
  cameraSpeedRatio: number,
  delta: number
): number => {
  const mouseDeltaX = -mouseMovement.x * cameraSpeedRatio;
  mouseMovement.x = 0;

  const newTheta = θ + mouseDeltaX * delta;
  return newTheta;
};

export const updatePhi = (
  mouseMovement: Coordinate,
  φ: number,
  cameraSpeedRatio: number,
  delta: number
): number => {
  const mouseDeltaY = mouseMovement.y * cameraSpeedRatio;
  mouseMovement.y = 0;

  const newPhi = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, φ + mouseDeltaY * delta));
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
  dampingFactor: number,
  delta: number
): void => {
  if (!(rigidBody && rigidBody.current)) return;

  // Calculate the new camera position using spherical coordinates
  const playerPos = rigidBody.current.translation();

  const x = playerPos.x + cameraRadius * Math.sin(θ) * Math.cos(φ);
  const y = playerPos.y + cameraRadius * Math.sin(φ) + positionOffsetY;
  const z = playerPos.z + cameraRadius * Math.cos(θ) * Math.cos(φ);

  // Smoothly interpolate to the target position
  camera.position.x += (x - camera.position.x) * dampingFactor * delta;
  camera.position.y += (y - camera.position.y) * dampingFactor * delta;
  camera.position.z += (z - camera.position.z) * dampingFactor * delta;

  // Interpolate the lookAt target
  const lookAtTarget = new THREE.Vector3(playerPos.x, playerPos.y + lookAtOffsetY, playerPos.z);

  camera.lookAt(
    new THREE.Vector3(
      camera.position.x + (lookAtTarget.x - camera.position.x) * dampingFactor * delta,
      camera.position.y + (lookAtTarget.y - camera.position.y) * dampingFactor * delta,
      camera.position.z + (lookAtTarget.z - camera.position.z) * dampingFactor * delta
    )
  );
};
