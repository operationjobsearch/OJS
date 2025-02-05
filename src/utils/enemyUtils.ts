import * as THREE from 'three';
import { EnemyProps, EnemyTypes, EnemyConfig } from '..';

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

export const createEnemy = (
  type: EnemyTypes,
  occupiedPositions: THREE.Vector3[] = []
): EnemyProps => {
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
  };
};
