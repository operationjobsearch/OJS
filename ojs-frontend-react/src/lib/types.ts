import * as THREE from "three";

export type KeyboardLayout = "QWERTY" | "Colemak";

export interface CameraControllerProps {
  playerRef: React.RefObject<THREE.Mesh>;
}

export interface GameConfig {
  keyboardLayout: KeyboardLayout;
}

export interface PlayerProps {
  playerRef: React.RefObject<THREE.Mesh>;
  moveSpeed: number;
  health: number;
}
