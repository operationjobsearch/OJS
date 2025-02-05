import { useEffect } from 'react';
import { createEnemy, Enemy, useEnemyStore, useGameStore, SpawnConfig, EnemyTypes } from '..';

export const EnemyManager = () => {
  const { currentStage } = useGameStore();
  const { enemies, spawnEnemy } = useEnemyStore();

  useEffect(() => {
    const spawnConf = SpawnConfig[currentStage];
    let spawnTypes: EnemyTypes[] = [];

    Object.entries(spawnConf.enemies).forEach(([enemyType, count]) => {
      for (let i = 0; i < count; i++) spawnTypes.push(enemyType as EnemyTypes);
    });

    spawnTypes = spawnTypes.sort(() => Math.random() - 0.5);
    const instantSpawns = spawnTypes.slice(0, spawnConf.instantSpawn);
    let remainingSpawns = spawnTypes.slice(spawnConf.instantSpawn);

    instantSpawns.forEach((enemy) => spawnEnemy(createEnemy(enemy)));

    const delayedSpawns = remainingSpawns.length;
    for (let i = 0; i < delayedSpawns; i++) {
      // TODO: add timer before executing spawn based on spawnConf.spawnInterval
      spawnEnemy(createEnemy(remainingSpawns[0]));
      remainingSpawns = remainingSpawns.slice(1);
    }
  }, [currentStage]);

  return enemies.map((enemy) => <Enemy {...enemy} key={enemy.id} />);
};
