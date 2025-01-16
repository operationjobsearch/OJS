import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useState } from "react";
import {
  createProjectile,
  Projectile,
  ProjectileProps,
  useGameStore,
  usePlayerStore,
} from "..";

export const Projectiles = () => {
  const { camera } = useThree();
  const { rigidBody, projectileVelocity } = usePlayerStore();
  const { isPointerLocked, isWindowActive } = useGameStore();

  // TODO: give this an actual type
  const [projectiles, setProjectiles] = useState<any[]>([]);

  const fireProjectile = useCallback(
    (newProjectile: ProjectileProps) => {
      setProjectiles((prev) => [...prev, newProjectile]);
    },
    [rigidBody]
  );

  const removeProjectile = useCallback(
    (id: number) => {
      setProjectiles((prev) => prev.filter((p) => p.id !== id));
    },
    [rigidBody]
  );

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!(isPointerLocked && isWindowActive)) return;
      fireProjectile(
        createProjectile(rigidBody, projectileVelocity, camera, true)
      );
      console.log(projectiles);
    };

    document.addEventListener("click", handleMouseDown);
    return () => {
      document.removeEventListener("click", handleMouseDown);
    };
  }, [rigidBody, projectiles, isPointerLocked, isWindowActive]);

  return (
    <>
      {/* Render all projectiles */}
      {projectiles.map((projectile) => (
        <Projectile
          key={projectile.id}
          id={projectile.id}
          position={projectile.position}
          direction={projectile.direction}
          velocity={projectile.speed}
          isFriendly={projectile.isFriendly}
          onExpire={() => removeProjectile(projectile.id)}
        />
      ))}
    </>
  );
};
