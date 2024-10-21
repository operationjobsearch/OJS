import { Player, GameProps } from "..";
import { Suspense, useRef } from "react";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

export const World = ({ player, game }: GameProps) => {
  const isOnFloor = useRef(true);

  return (
    <Suspense>
      <Physics>
        <RigidBody
          ref={player.characterRigidBody}
          colliders="cuboid"
          onCollisionEnter={({ other }) => {
            if (
              other.rigidBodyObject &&
              other.rigidBodyObject.name === "floor"
            ) {
              isOnFloor.current = true;
            }
          }}
          onCollisionExit={({ other }) => {
            if (
              other.rigidBodyObject &&
              other.rigidBodyObject.name === "floor"
            ) {
              isOnFloor.current = false;
            }
          }}
        >
          <Player ref={player.characterModel} player={player} game={game} />
        </RigidBody>

        <RigidBody colliders="cuboid" type="fixed" name="floor">
          <Box position={[0, -1, 0]} args={[10, 1, 10]}>
            <meshStandardMaterial color="hotpink" />
          </Box>
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
