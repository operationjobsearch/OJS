import * as THREE from "three";
import { RapierRigidBody } from "@react-three/rapier";
import { Coordinate } from "./gameTypes";

export interface CameraObject {
  // Camera
  positionOffsetY: number;
  lookAtOffsetY: number;
  θ: number;
  φ: number;
  cameraRadius: number;
  cameraSpeedRatio: number;
  dampingFactor: number;

  setCameraAngles: (frameTime: number, mouseMovement: Coordinate) => void;
  setCameraPosition: (
    camera: THREE.Camera,
    playerRigidBody: React.RefObject<RapierRigidBody> | null
  ) => void;
}
