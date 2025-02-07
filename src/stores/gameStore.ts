import { create } from 'zustand';
import { GameObject, GameStage, GameState } from '..';
import Stats from 'stats.js';

export const useGameStore = create<GameObject>()((set, get) => ({
  // State
  gameState: 1,
  stats: new Stats(),
  fpsLimit: 60,
  currentStage: 1,
  isPaused: false,
  isStageCleared: false,

  setGameState: (state) => set({ gameState: state }),
  setStageCleared: (isCleared) => set({ isStageCleared: isCleared }),
  pauseOnPointerLockChange: () => set({ isPaused: !Boolean(document.pointerLockElement) }),
  advanceGame: () => {
    const { currentStage } = get();

    let nextStage: number = 0;
    const win: number = GameState.Won;
    switch (currentStage) {
      case GameStage.Application:
        nextStage = GameStage.Assessment;
        set({ currentStage: nextStage });
        break;
      case GameStage.Assessment:
        nextStage = GameStage.Interview;
        set({ currentStage: nextStage });
        break;
      case GameStage.Interview:
        document.exitPointerLock();
        nextStage = GameStage.Application;
        set({ gameState: win, currentStage: nextStage });
        break;
    }
  },

  // Settings
  isDebugEnabled: true,
  isAntiAliasingEnabled: false,
  keyboardLayout: 'QWERTY',

  setDebugMode: (isEnabled) => set({ isDebugEnabled: isEnabled }),
}));
