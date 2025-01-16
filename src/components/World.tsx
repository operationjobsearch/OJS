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
  const { isDebugEnabled, fpsLimit } = useGameStore();

  return (
    <Suspense>
      <Physics debug={isDebugEnabled} timeStep={"vary"}>
        <Player />
        <RigidBody colliders="cuboid" type="fixed" name="floor" friction={0}>
          <Box position={[0, -1, 0]} args={[10, 1, 10]}>
            <meshStandardMaterial color="blue" />
          </Box>
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
