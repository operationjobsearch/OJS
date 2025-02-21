import { create } from 'zustand';
import { GameObject, GameStage, GameState } from '..';
import Stats from 'stats.js';

export const useGameStore = create<GameObject>()((set, get) => ({
  // State
  gameState: 1,
  stats: new Stats(),
  fpsTarget: 60,
  currentStage: 1,
  isPaused: false,
  isStageCleared: false,

  setFpsTarget: (fpsCap) => set({ fpsTarget: fpsCap }),
  setGameStage: (stage) => set({ currentStage: stage }),
  setGameState: (state) => set({ gameState: state }),
  setStageCleared: (isCleared) => set({ isStageCleared: isCleared }),
  setPaused: (paused) => set({ isPaused: paused }),
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
        nextStage = GameStage.Application;
        set({ gameState: win, currentStage: nextStage });
        break;
    }
  },

  // Settings
  cameraVerticalOffset: 8,
  cameraHorizontalOffset: 8,
  cameraAngle: Math.PI / 6,

  isDebugEnabled: true,
  isAntiAliasingEnabled: true,
  keyboardLayout: 'QWERTY',
  pixelRatio: 0.5,

  setDebugMode: (isEnabled) => set({ isDebugEnabled: isEnabled }),

  projectiles: [],
  spawnProjectile: (newProjectile) => {
    const { projectiles } = get();
    set({ projectiles: [...projectiles, newProjectile] });
  },
  destroyProjectile: (id) => {
    const { projectiles } = get();
    set({ projectiles: projectiles.filter((p) => p.id !== id) });
  },
}));
