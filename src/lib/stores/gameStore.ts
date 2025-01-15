import { create } from "zustand";
import { GameObject } from "../..";
import Stats from "stats.js";

export const useGameStore = create<GameObject>()((set) => ({
  // State
  stats: new Stats(),
  fpsLimit: 144,
  isPointerLocked: false,
  isWindowActive: true,

  setFocus: () => set({ isWindowActive: true }),
  setBlur: () => set({ isWindowActive: false }),
  setPointerLockChange: () =>
    set({ isPointerLocked: !!document.pointerLockElement }),

  // Settings
  keyboardLayout: "QWERTY",
}));
