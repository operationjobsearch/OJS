import * as THREE from 'three';
import {
  AttackStats,
  AttackTypes,
  EnemyProps,
  EnemyTypes,
  GameStage,
  PlayerStats,
  StageConfig,
} from '..';

export const PlayerDefaults: PlayerStats = {
  health: 100,
};

export const AttackConfig: Record<string, AttackStats> = {
  [AttackTypes.Primary]: {
    type: AttackTypes.Primary,
    // TODO: determine fair and balanced value
    baseDamage: 10,
  },
  // TODO: change player secondary attack to projectile rather than hit scan; scale size AND damage
  [AttackTypes.Secondary]: {
    type: AttackTypes.Secondary,
    baseDamage: 50,
    chargeMultiplier: 3,
  },
  [AttackTypes.JobPostingAtk]: {
    type: AttackTypes.JobPostingAtk,
    baseDamage: 5,
    projectileTimeout: 3000
  },
  [AttackTypes.GhostJobAtk]: {
    type: AttackTypes.GhostJobAtk,
    baseDamage: 1,
    projectileTimeout: 5000
  },
};

export const EnemyConfig: Record<EnemyTypes, EnemyProps> = {
  [EnemyTypes.JobPosting]: {
    id: '',
    type: EnemyTypes.JobPosting,
    attackType: AttackTypes.JobPostingAtk,
    rigidBody: null,
    position: new THREE.Vector3(),

    attackSpeed: 1,
    health: 100,
  },
  [EnemyTypes.GhostJob]: {
    id: '',
    type: EnemyTypes.GhostJob,
    attackType: AttackTypes.GhostJobAtk,
    rigidBody: null,
    position: new THREE.Vector3(),

    attackSpeed: 2,
    health: 150,
  },
};

export const SpawnConfig: Record<GameStage, StageConfig> = {
  [GameStage.Application]: {
    enemies: {
      [EnemyTypes.JobPosting]: 5,
      [EnemyTypes.GhostJob]: 2,
    },
    instantSpawn: 3,
    spawnInterval: 5,
  },
  [GameStage.Assessment]: {
    enemies: {
      [EnemyTypes.JobPosting]: 8,
      [EnemyTypes.GhostJob]: 4,
    },
    instantSpawn: 5,
    spawnInterval: 4,
  },
  [GameStage.Interview]: {
    enemies: {
      [EnemyTypes.JobPosting]: 10,
      [EnemyTypes.GhostJob]: 6,
    },
    instantSpawn: 6,
    spawnInterval: 3,
  },
};
