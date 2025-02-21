import * as THREE from 'three';
import { useEffect, useState } from 'react';
import {
  Enemy,
  useEnemyStore,
  useGameStore,
  usePlayerStore,
  SpawnConfig,
  EnemyTypes,
  EnemyProps,
  EnemyConfig,
} from '../../..';

export const EnemyManager = () => {
  const { enemies, spawnEnemy } = useEnemyStore();
  const { isPaused, currentStage, setStageCleared } = useGameStore();
  const [spawningComplete, setSpawningComplete] = useState<boolean>(false);
  const playerRb = usePlayerStore((p) => p.rigidBody);

  const getSpawnPosition = (occupiedPositions: THREE.Vector3[]): THREE.Vector3 => {
    let position: THREE.Vector3;
    let attempts = 0;

    do {
      const posX = Math.random() * 20 - 10;
      const posZ = Math.random() * 20 - 10;
      position = new THREE.Vector3(posX, 1, posZ);
      attempts++;
    } while (occupiedPositions.some((pos) => pos.distanceTo(position) < 2) && attempts < 10);

    return position;
  };

  const createEnemy = (type: EnemyTypes, occupiedPositions: THREE.Vector3[] = []): EnemyProps => {
    const id = `enemy-${Date.now()}-${Math.random() * 100}`;
    const position = getSpawnPosition(occupiedPositions);
    const baseStats = EnemyConfig[type];

    return {
      id,
      type,
      attackType: baseStats.attackType,
      rigidBody: null,
      position,
      attackSpeed: baseStats.attackSpeed,
      health: baseStats.health,

      attackPattern: EnemyConfig[type].attackPattern,
      movementPattern: EnemyConfig[type].movementPattern,
    };
  };

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
