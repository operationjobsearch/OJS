import { create } from "zustand";
import { GameObject } from "../..";

export const useGameStore = create<GameObject>()((set) => ({
  // State
  fpsLimit: 60,
  isPointerLocked: false,
  isWindowActive: true,

  setFocus: () => set({ isWindowActive: true }),
  setBlur: () => set({ isWindowActive: false }),
  setPointerLockChange: () =>
    set({ isPointerLocked: !!document.pointerLockElement }),

  // Settings
  keyboardLayout: "QWERTY",
}));
