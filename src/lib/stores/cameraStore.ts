import * as THREE from "three";
import { create } from "zustand";
import {
  CameraObject,
  Coordinate,
  moveCamera,
  updatePhi,
  updateTheta,
} from "../..";
import { RapierRigidBody } from "@react-three/rapier";

export const useCameraStore = create<CameraObject>()((set, get) => ({
  // Camera
  θ: 0,
  φ: Math.PI / 6,
  cameraRadius: 3,
  cameraVerticalOffset: 1,
  cameraLookAtOffset: 1.75,
  cameraSpeedRatio: 0.35,
  dampingFactor: 0.1,

  setCameraAngles: (frameTime: number, mouseMovement: Coordinate) => {
    const { θ, φ, cameraSpeedRatio } = get();

    set(() => ({
      θ: updateTheta(mouseMovement, θ, cameraSpeedRatio, frameTime),
      φ: updatePhi(mouseMovement, φ, cameraSpeedRatio, frameTime),
    }));
  },

  setCameraPosition: (
    camera: THREE.Camera,
    playerRigidBody: React.RefObject<RapierRigidBody> | null
  ) => {
    const {
      cameraRadius,
      cameraLookAtOffset,
      cameraVerticalOffset,
      θ,
      φ,
      dampingFactor,
    } = get();
    moveCamera(
      camera,
      cameraRadius,
      cameraLookAtOffset,
      cameraVerticalOffset,
      θ,
      φ,
      playerRigidBody,
      dampingFactor
    );
  },
}));
