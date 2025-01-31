import { create } from "zustand";
import { EnemyFactory, EnemyProps, EnemyTypes } from "..";

export const useEnemyStore = create<EnemyFactory>()((set, get) => ({
  enemies: [],
  spawnEnemy: (newEnemy) => {
    const { enemies } = get();
    set({ enemies: [...enemies, newEnemy] });
  },
  destroyEnemy: (id) => {
    const { enemies } = get();
    set({ enemies: enemies.filter((e) => e.id !== id) });
  },
  damageEnemy: (id, dmg) => {
    const { enemies } = get();
    const updatedEnemies = enemies
      .map((e) => {
        if (e.id === id) {
          const updatedHealth = e.health - dmg;
          return e.health <= 0 ? null : { ...e, health: updatedHealth };
        }
        return e;
      })
      .filter((e) => e !== null);

    set({ enemies: updatedEnemies });
  },
  setEnemyRb: (id, rb) => {
    const { enemies } = get();
    set({
      enemies: enemies.map((enemy) =>
        enemy.id === id ? { ...enemy, rigidBody: rb } : enemy
      ),
    });
  },
  setEnemyAttackCd: () => {},
  attack: (enemyType) => {
    switch (enemyType) {
      case EnemyTypes.JobPosting:
        break;
    }
  },
  handleCollisions: (id, o, isCollisionEnter) => {
    if (!isCollisionEnter) return;
  },
}));
