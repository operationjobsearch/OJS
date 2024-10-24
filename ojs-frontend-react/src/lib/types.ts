import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };

export enum Controls {
  forward = "forward",
  left = "left",
  backward = "backward",
  right = "right",
  jump = "jump",
}

export interface GameObject {
  // State
  isPointerLocked: boolean;
  isWindowActive: boolean;

  // Settings
  keyboardLayout: KeyboardLayout;

  // Camera
  cameraVerticalOffset: number;
  cameraLookAtOffset: number;
  cameraAngleTheta: number;
  cameraAnglePhi: number;
  cameraRadius: number;
}

export interface PlayerObject {
  characterModel: React.RefObject<THREE.Mesh>;
  rigidBody: React.RefObject<RapierRigidBody>;
  mouseMovement: React.RefObject<Coordinate>;
  reticle: React.RefObject<THREE.Mesh>;
  moveSpeed: number;
  health: number;
  isOnFloor: boolean;
  impulse: number;
}

export interface GameProps {
  player: PlayerObject;
  game: GameObject;
}

export interface CameraControllerProps {
  characterModel: React.RefObject<THREE.Mesh>;
}
