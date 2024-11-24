import { Player, GameProps, handleCollisions } from "..";
import { Suspense } from "react";
import { CapsuleCollider, Physics, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

export const World = ({ game, player }: GameProps) => {
  return (
    <Suspense>
      <Physics debug={true} timeStep={1 / game.fps}>
        <Player {...{ game, player }} />

        <RigidBody colliders="cuboid" type="fixed" name="floor" friction={0}>
          <Box position={[0, -1, 0]} args={[10, 1, 10]}>
            <meshStandardMaterial color="blue" />
          </Box>
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
