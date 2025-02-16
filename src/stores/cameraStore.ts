import * as THREE from 'three';
import { create } from 'zustand';
import { CameraObject, Coordinate, moveCamera, updatePhi, updateTheta } from '..';
import { RapierRigidBody } from '@react-three/rapier';

export const useCameraStore = create<CameraObject>()((set, get) => ({
  // Camera
  θ: 0,
  φ: Math.PI / 6,
  cameraRadius: 2.5,
  positionOffsetY: 1.75, // how far above the player the camera is positioned
  lookAtOffsetY: 1.5, // how far above the player the camera is looking
  cameraSpeedRatio: 0.35,
  dampingFactor: 0.1,

  setCameraAngles: (delta: number, mouseMovement: Coordinate) => {
    const { θ, φ, cameraSpeedRatio } = get();

    set(() => ({
      θ: updateTheta(mouseMovement, θ, cameraSpeedRatio, delta),
      φ: updatePhi(mouseMovement, φ, cameraSpeedRatio, delta),
    }));
  },

  setCameraPosition: (
    camera: THREE.Camera,
    playerRigidBody: React.RefObject<RapierRigidBody> | null
  ) => {
    const { cameraRadius, lookAtOffsetY, positionOffsetY, θ, φ, dampingFactor } = get();
    moveCamera(
      camera,
      cameraRadius,
      lookAtOffsetY,
      positionOffsetY,
      θ,
      φ,
      playerRigidBody,
      dampingFactor
    );
  },
}));
