import { Player, GameProps, handleCollisions } from "..";
import { Suspense } from "react";
import { CapsuleCollider, Physics, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

export const World = ({ game, player }: GameProps) => {
  return (
    <Suspense>
      <Physics debug={true} timeStep={1 / 60}>
        <RigidBody
          ref={player.rigidBody}
          lockRotations
          linearDamping={0}
          colliders={false}
          mass={20}
          friction={0}
          onCollisionEnter={({ other }) => {
            handleCollisions(player, other, true);
          }}
          onCollisionExit={({ other }) => {
            handleCollisions(player, other, false);
          }}
        >
          <CapsuleCollider
            args={[0.1, 0.5]}
            position={[0, 0.5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            friction={0}
          />
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
