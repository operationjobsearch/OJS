import { useEffect, useState } from 'react';
import {
  createEnemy,
  Enemy,
  useEnemyStore,
  useGameStore,
  SpawnConfig,
  EnemyTypes,
  EndMenu,
} from '..';

export const EnemyManager = () => {
  const { enemies, spawnEnemy } = useEnemyStore();
  const { currentStage, setStageCleared } = useGameStore();
  const [spawningComplete, setSpawningComplete] = useState<boolean>(false);

  useEffect(() => {
    if (spawningComplete && enemies.length === 0) {
      // console.log('stage cleared');
      setStageCleared(true);
      setSpawningComplete(false);
    }
  }, [enemies.length, spawningComplete]);

  useEffect(() => {
    // console.log('current stage: ', currentStage);
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
      // TODO: configure logic to pause spawning, maybe w/ global clock in a store
      // in case multiple functions need this pause/resume functionality w/ timers
      spawnEnemy(createEnemy(remainingSpawns[0]));
      remainingSpawns = remainingSpawns.slice(1);
    }

    setSpawningComplete(true);
  }, [currentStage]);

  return enemies.map((enemy) => <Enemy {...enemy} key={enemy.id} />);
};
