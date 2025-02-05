import { create } from 'zustand';
import { GameObject, GameStage } from '..';
import Stats from 'stats.js';

export const useGameStore = create<GameObject>()((set, get) => ({
  // State
  stats: new Stats(),
  fpsLimit: 144,
  isGameOver: false,
  currentStage: 1,
  isPaused: false,

  pauseOnPointerLockChange: () => set({ isPaused: !Boolean(document.pointerLockElement) }),
  setGameOver: (isOver) => set({ isGameOver: isOver }),
  setGameStage: (stage) => set({ currentStage: stage }),

  // Settings
  isDebugEnabled: true,
  keyboardLayout: 'QWERTY',

  setDebugMode: (isEnabled) => set({ isDebugEnabled: isEnabled }),
}));
