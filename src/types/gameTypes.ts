import Stats from "stats.js";

export type KeyboardLayout = "QWERTY" | "Colemak";
export type Coordinate = { x: number; y: number };

export enum RenderOrders {
  Base,
  Hud,
}

export enum GameStage {
  Application,
  Assessment,
  Interview,
}

export interface GameObject {
  // State
  stats: Stats;
  fpsLimit: number;
  isPointerLocked: boolean;
  isWindowActive: boolean;

  setFocus: () => void;
  setBlur: () => void;
  setPointerLockChange: () => void;

  // Settings
  isDebugEnabled: boolean;
  keyboardLayout: KeyboardLayout;

  setDebugMode: (isEnabled: boolean) => void;
}
