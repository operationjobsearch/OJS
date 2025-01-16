import { create } from "zustand";
import { ProjectileObject } from "../types";

export const useProjectileStore = create<ProjectileObject>()((set, get) => ({
  projectiles: [],
  spawnProjectile: (newProjectile) => {
    const { projectiles } = get();
    set(() => ({ projectiles: [...projectiles, newProjectile] }));
  },
  destroyProjectile: (id) => {
    const { projectiles } = get();
    set(() => ({
      projectiles: projectiles.filter((p) => p.id !== id),
    }));
  },
}));
