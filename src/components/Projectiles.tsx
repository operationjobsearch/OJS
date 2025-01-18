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
  const { rigidBody, projectileVelocity, isFiring, setIsFiring } =
    usePlayerStore();

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
  }, [rigidBody, projectiles, isPointerLocked, isWindowActive]);

  useFrame(() => {
    // TODO: throttle this with a rate of fire or attack speed
    // also determine if destroy is properly disposing of projectiles
    if (isFiring) {
      const newProjectile = createProjectile(
        rigidBody,
        projectileVelocity,
        camera,
        true
      );
      spawnProjectile(newProjectile);
    }
  });

  return (
    <>
      {/* Render all projectiles */}
      {projectiles.map((projectile) => (
        <Projectile
          key={projectile.id}
          id={projectile.id}
          position={projectile.position}
          direction={projectile.direction}
          velocity={projectile.velocity}
          isFriendly={projectile.isFriendly}
          onExpire={() => destroyProjectile(projectile.id)}
        />
      ))}
    </>
  );
};
