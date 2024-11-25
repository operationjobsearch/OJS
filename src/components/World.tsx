import {
  Player,
  GameProps,
  Projectile,
  ProjectileProps,
  handleMouseEvent,
} from "..";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";
import * as THREE from "three";

export const World = ({ game, player }: GameProps) => {
  const [projectiles, setProjectiles] = useState<any[]>([]);

  const fireProjectile = useCallback(() => {
    const newProjectile: ProjectileProps = {
      key: `${Date.now()}-${Math.random()}`,
      position: player.rigidBody.current?.translation(),
      direction: player.directions.forwardVector,
      velocity: player.projectileVelocity,
      isFriendly: true,
    };

    setProjectiles((prev) => [...prev, newProjectile]);
  }, []);

  const removeProjectile = useCallback((id: string) => {
    setProjectiles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      fireProjectile();
      console.log(projectiles);
    };

    document.addEventListener("click", handleMouseDown);
    return () => {
      document.removeEventListener("click", handleMouseDown);
    };
  }, []);

  return (
    <Suspense>
      <Physics debug={true} timeStep={1 / game.fps}>
        <Player {...{ game, player }} />
        {/* Render all projectiles */}
        {projectiles.map((projectile) => (
          <Projectile
            key={projectile.id}
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
