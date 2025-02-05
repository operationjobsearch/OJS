import { create } from 'zustand';
import { AttackFactory } from '..';

export const useAttackStore = create<AttackFactory>()((set, get) => ({
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
