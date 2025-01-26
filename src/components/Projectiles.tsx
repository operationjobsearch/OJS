import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import {
  createProjectile,
  Projectile,
  useGameStore,
  usePlayerStore,
  useProjectileStore,
} from "..";

export const Projectiles = () => {
  const { camera } = useThree();
  const { isPointerLocked, isWindowActive } = useGameStore();
  const { projectiles, spawnProjectile, destroyProjectile } =
    useProjectileStore();
  const {
    rigidBody,
    reticle,
    projectileVelocity,
    playerColliderRadius,
    isFiring,
    attackSpeed,
    lastProjectile,
    setLastProjectile,
    setIsFiring,
  } = usePlayerStore();

  useEffect(() => {
    const handleMouseUp = () => {
      setIsFiring(false);
    };

    const handleMouseDown = () => {
      setIsFiring(true);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [rigidBody, reticle, projectiles, isPointerLocked, isWindowActive]);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    const canFire = elapsedTime > lastProjectile + 1 / attackSpeed;
    if (isFiring && reticle?.current && canFire) {
      setLastProjectile(elapsedTime);
      const newProjectile = createProjectile(
        rigidBody,
        projectileVelocity,
        playerColliderRadius,
        camera,
        reticle.current,
        true
      );
      spawnProjectile(newProjectile);
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
