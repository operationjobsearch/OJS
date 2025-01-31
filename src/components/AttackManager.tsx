import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import {
  Projectile,
  usePlayerStore,
  useAttackStore,
  canFirePrimaryAttack,
  useEnemyStore,
  AttackTypes,
  AttackConfig,
  getHitId,
  getChargedAttackDamage,
} from "..";

export const AttackManager = () => {
  // const { isPaused } = useGameStore();
  const { camera, scene } = useThree();
  const { damageEnemy } = useEnemyStore();
  const { projectiles, spawnProjectile, destroyProjectile } = useAttackStore();
  const {
    isFiringPrimary,
    isFiringSecondary,
    chargeStartTime,
    attackSpeed,
    lastAttack,
    setLastAttack,
  } = usePlayerStore();

  useFrame((state, delta) => {
    if (
      canFirePrimaryAttack(
        isFiringPrimary,
        isFiringSecondary,
        lastAttack,
        attackSpeed
      )
    ) {
      setLastAttack(performance.now());
      const attackTargetId = getHitId(camera, scene);
      damageEnemy(attackTargetId, AttackConfig[AttackTypes.Primary].baseDamage);
    }

    if (isFiringSecondary) {
      const attackTargetId = getHitId(camera, scene);
      const dmg = getChargedAttackDamage(chargeStartTime);
      console.log("damage", dmg);
      damageEnemy(attackTargetId, dmg);
    }
  });

  return projectiles.map((projectile) => (
    <Projectile
      {...projectile}
      key={projectile.id}
      onExpire={() => destroyProjectile(projectile.id)}
    />
  ));
};
