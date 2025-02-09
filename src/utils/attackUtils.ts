import * as THREE from 'three';
import { AttackConfig, AttackTypes, EnemyTypes, ProjectileProps } from '..';
import { RapierRigidBody } from '@react-three/rapier';

export const getHitId = (camera: THREE.Camera, scene: THREE.Scene): string => {
  const raycaster = new THREE.Raycaster();
  const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
  raycaster.set(camera.position, direction);

  const hits = raycaster.intersectObjects(scene.children);
  for (const hit of hits) {
    if (hit.object.userData.enemyId) {
      // console.log('hit:', hit.object.userData.enemyId);
      return hit.object.userData.enemyId;
    }
  }

  return '';
};

export const getChargedAttackDamage = (chargeStartTime: number): number => {
  const attackStats = AttackConfig[AttackTypes.Secondary];
  const chargeDuration = (performance.now() - chargeStartTime) / 1000;
  console.log('charge time', chargeDuration);
  const chargeMultiplier = Math.min(chargeDuration, attackStats.chargeMultiplier!);

  return attackStats.baseDamage * chargeMultiplier;
};

export const canFirePrimaryAttack = (
  isFiringPrimary: boolean,
  isChargingSecondary: boolean,
  lastAttack: number,
  attackSpeed: number
): boolean => {
  const elapsedTime = (performance.now() - lastAttack) / 1000;
  const offCooldown = elapsedTime >= 1 / attackSpeed;
  return offCooldown && isFiringPrimary && !isChargingSecondary;
};

export const createEnemyProjectile = (
  creatorRb: React.RefObject<RapierRigidBody> | null,
  playerRb: React.RefObject<RapierRigidBody> | null,
  projectileVelocity: number,
  projectileOffset: number,
  attackType: AttackTypes
): ProjectileProps => {
  if (!creatorRb?.current || !playerRb?.current) return null!;

  const playerPos = new THREE.Vector3(
    playerRb.current.translation().x,
    playerRb.current.translation().y,
    playerRb.current.translation().z
  );

  const creatorPos = new THREE.Vector3(
    creatorRb.current.translation().x,
    creatorRb.current.translation().y,
    creatorRb.current.translation().z
  );

  const direction = new THREE.Vector3();
  direction.subVectors(playerPos, creatorPos).normalize();

  // Offset projectile start position so it doesn't spawn inside player
  const spawnPosition = creatorPos.clone().addScaledVector(direction, projectileOffset);

  return {
    id: `projectile-${Date.now()}-${Math.random() * 100}`,
    position: spawnPosition,
    direction: direction,
    velocity: projectileVelocity,
    name: attackType.toString(),
    isFriendly: false,
  };
};
