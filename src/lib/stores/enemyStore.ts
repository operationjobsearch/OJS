import { create } from "zustand";
import { EnemyObject, EnemyTypes } from "../types";

export const useEnemyStore = create<EnemyObject>()((set, get) => ({
  enemies: [{ id: 1, type: EnemyTypes.jobPosting, rigidBody: null }],
  spawnEnemy: (newEnemy) => {
    const { enemies } = get();
    set({ enemies: [...enemies, newEnemy] });
  },
  destroyEnemy: (id) => {
    const { enemies } = get();
    set({ enemies: enemies.filter((e) => e.id !== id) });
  },
}));
