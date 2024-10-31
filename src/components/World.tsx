import { Player, GameProps } from "..";
import { Suspense } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

export const World = ({ game, player }: GameProps) => {
  return (
    <Suspense>
      <Physics>
        <RigidBody
          ref={player.rigidBody}
          colliders="cuboid"
          onCollisionEnter={({ other }) => {
            if (
              other.rigidBodyObject &&
              other.rigidBodyObject.name === "floor"
            ) {
              player.isOnFloor = true;
            }
          }}
          onCollisionExit={({ other }) => {
            if (
              other.rigidBodyObject &&
              other.rigidBodyObject.name === "floor"
            ) {
              player.isOnFloor = false;
            }
          }}
        >
          <Player {...{ game, player }} />
        </RigidBody>

        <RigidBody colliders="cuboid" type="fixed" name="floor" friction={0}>
          <Box position={[0, -1, 0]} args={[10, 1, 10]}>
            <meshStandardMaterial color="hotpink" />
          </Box>
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
