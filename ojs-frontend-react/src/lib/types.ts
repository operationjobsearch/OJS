import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };

export interface GameObject {
  keyboardLayout: KeyboardLayout;
}

export interface PlayerObject {
  modelRef: React.RefObject<THREE.Mesh>;
  moveSpeed: number;
  health: number;
}

export interface PlayerProps {
  player: PlayerObject;
  game: GameObject;
}

export interface CameraControllerProps {
  modelRef: React.RefObject<THREE.Mesh>;
}
