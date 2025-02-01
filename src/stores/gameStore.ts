import { create } from "zustand";
import { GameObject, GameStage } from "..";
import Stats from "stats.js";

export const useGameStore = create<GameObject>()((set) => ({
  // State
  stats: new Stats(),
  fpsLimit: 144,
  isPointerLocked: false,
  isWindowActive: true,
  isGameOver: false,
  currentStage: 1,
  isPaused: false,

  setFocus: () => set({ isWindowActive: true }),
  setBlur: () => set({ isWindowActive: false }),
  setPointerLockChange: () =>
    set({ isPointerLocked: !!document.pointerLockElement }),
  setPaused: (isPaused) => {set({ isPaused: isPaused });},
  setGameOver: (isOver) => set({ isGameOver: isOver }),
  setGameStage: (stage) => set({ currentStage: stage }),

  // Settings
  isDebugEnabled: true,
  keyboardLayout: "QWERTY",

  setDebugMode: (isEnabled) => set({ isDebugEnabled: isEnabled }),
}));
