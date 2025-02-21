import { create } from 'zustand';
import { EnemyFactory } from '..';

//#region store
export const useEnemyStore = create<EnemyFactory>()((set, get) => ({
  enemies: [],
  spawnEnemy: (newEnemy) => {
    const { enemies } = get();
    set({ enemies: [...enemies, newEnemy] });
  },
  damageEnemy: (id, dmg) => {
    const { enemies } = get();
    const updatedEnemies = enemies
      .map((e) => {
        if (e.id === id) {
          const updatedHealth = e.health - dmg;
          console.log(updatedHealth);
          return updatedHealth <= 0 ? null : { ...e, health: updatedHealth };
        }
        console.log('damage', dmg);
        console.log('damaged', id);
        return e;
      })
      .filter((e) => e !== null);

    set({ enemies: updatedEnemies });
  },
  setEnemyRb: (id, rb) => {
    const { enemies } = get();
    set({
      enemies: enemies.map((enemy) => (enemy.id === id ? { ...enemy, rigidBody: rb } : enemy)),
    });
  },
  resetEnemies: () => set({ enemies: [] }),
}));
//#endregion
