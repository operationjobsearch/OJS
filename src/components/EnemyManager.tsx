import * as THREE from 'three';
import { useEffect, useState } from 'react';
import {
  createEnemy,
  Enemy,
  useEnemyStore,
  useGameStore,
  usePlayerStore,
  SpawnConfig,
  EnemyTypes,
  EndMenu,
} from '..';
import { useFrame } from '@react-three/fiber';

export const EnemyManager = () => {
  const { enemies, spawnEnemy } = useEnemyStore();
  const { isPaused, currentStage, setStageCleared } = useGameStore();
  const [spawningComplete, setSpawningComplete] = useState<boolean>(false);
  const playerRb = usePlayerStore((p) => p.rigidBody);

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

  useFrame((state, delta) => {
    if (isPaused || !playerRb?.current) return;

    const playerPosition = new THREE.Vector3().copy(playerRb.current.translation());

    enemies.forEach((enemy) => {
      const enemyRb = enemy.rigidBody?.current;
      if (!enemyRb) return;

      // TODO: move moveSpeed to enemy stats and refactor
      const moveSpeed = 2;
      const enemyPosition = enemyRb.translation();
      let movement = new THREE.Vector3();

      // Movement based on enemy type
      switch (enemy.type) {
        case 'JobPosting': // Chase Player
          movement = playerPosition
            .clone()
            .sub(enemyPosition)
            .normalize()
            .multiplyScalar(moveSpeed * delta);
          break;

        case 'GhostJob': // Wander Randomly
          movement = new THREE.Vector3(
            (Math.random() - 0.5) * moveSpeed * delta,
            0,
            (Math.random() - 0.5) * moveSpeed * delta
          );
          break;
      }

      // Simple Separation Force (Avoid Stacking)
      const separationForce = new THREE.Vector3();
      enemies.forEach((otherEnemy) => {
        if (otherEnemy.id === enemy.id) return;
        const otherPos = otherEnemy.rigidBody?.current?.translation();
        if (!otherPos) return;

        const distance = new THREE.Vector3().subVectors(enemyPosition, otherPos).length();
        if (distance < 1.5) {
          const pushDir = new THREE.Vector3().subVectors(enemyPosition, otherPos).normalize();
          separationForce.add(pushDir.multiplyScalar(0.5 * delta));
        }
      });

      movement.add(separationForce);

      // Apply movement
      enemyRb.setTranslation(
        {
          x: enemyPosition.x + movement.x,
          y: enemyPosition.y,
          z: enemyPosition.z + movement.z,
        },
        true
      );
    });
  });

  return enemies.map((enemy) => <Enemy {...enemy} key={enemy.id} />);
};
