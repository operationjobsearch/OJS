import { useEffect } from "react";
import { createEnemy, Enemy, EnemyTypes, useEnemyStore } from "..";

export const EnemyManager = () => {
  const { enemies, spawnEnemy, destroyEnemy } = useEnemyStore();

  useEffect(() => {
    const enemy1 = createEnemy(EnemyTypes.JobPosting);
    spawnEnemy(enemy1);
  }, []);

  return enemies.map((enemy) => (
    <Enemy {...enemy} key={enemy.id} onExpire={() => destroyEnemy(enemy.id)} />
  ));
};
