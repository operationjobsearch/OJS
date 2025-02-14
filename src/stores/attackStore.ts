import { create } from 'zustand';
import { AttackFactory } from '..';

export const useAttackStore = create<AttackFactory>()((set, get) => ({
  projectiles: [],
  projectileOffset: 1,
  projectileVerticalOffset: 0.5,
  projectileVelocity: 10,
  spawnProjectile: (newProjectile) => {
    const { projectiles } = get();
    set({ projectiles: [...projectiles, newProjectile] });
  },
  destroyProjectile: (id) => {
    const { projectiles } = get();
    set({ projectiles: projectiles.filter((p) => p.id !== id) });
  },
}));
