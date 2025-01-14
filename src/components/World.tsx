import {
  Player,
  Projectile,
  ProjectileProps,
  createProjectile,
  useGameStore,
  usePlayerStore,
} from "..";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const World = () => {
  const { camera } = useThree();
  const { rigidBody, projectileVelocity } = usePlayerStore();
  const { isPointerLocked, isWindowActive, fpsLimit } = useGameStore();

  const [projectiles, setProjectiles] = useState<any[]>([]);

  const fireProjectile = useCallback((newProjectile: ProjectileProps) => {
    setProjectiles((prev) => [...prev, newProjectile]);
  }, []);

  const removeProjectile = useCallback((id: number) => {
    setProjectiles((prev) => prev.filter((p) => p.id !== id));
  }, []);

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
  }, [projectiles]);

  return (
    <Suspense>
      <Physics debug={true} timeStep={1 / fpsLimit}>
        <Player />
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
        <RigidBody colliders="cuboid" type="fixed" name="floor" friction={0}>
          <Box position={[0, -1, 0]} args={[10, 1, 10]}>
            <meshStandardMaterial color="blue" />
          </Box>
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
