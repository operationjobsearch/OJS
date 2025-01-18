import * as THREE from "three";
import { create } from "zustand";
import {
  CameraObject,
  Coordinate,
  moveCamera,
  updateCameraAnglePhi,
  updateCameraAngleTheta,
} from "../..";
import { RapierRigidBody } from "@react-three/rapier";

export const useCameraStore = create<CameraObject>()((set, get) => ({
  // Camera
  cameraAngleTheta: 0,
  cameraAnglePhi: Math.PI / 6,
  cameraRadius: 3,
  cameraVerticalOffset: 2.5,
  cameraLookAtOffset: 1.25,
  cameraSpeedRatio: 0.35,
  dampingFactor: 0.1,

  setCameraAngles: (frameTime: number, mouseMovement: Coordinate) => {
    const { cameraAngleTheta, cameraAnglePhi, cameraSpeedRatio } = get();

    set(() => ({
      cameraAngleTheta: updateCameraAngleTheta(
        mouseMovement,
        cameraAngleTheta,
        cameraSpeedRatio,
        frameTime
      ),
      cameraAnglePhi: updateCameraAnglePhi(
        mouseMovement,
        cameraAnglePhi,
        cameraSpeedRatio,
        frameTime
      ),
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
      cameraAngleTheta,
      cameraAnglePhi,
      dampingFactor,
    } = get();
    moveCamera(
      camera,
      cameraRadius,
      cameraLookAtOffset,
      cameraVerticalOffset,
      cameraAngleTheta,
      cameraAnglePhi,
      playerRigidBody,
      dampingFactor
    );
  },
}));
