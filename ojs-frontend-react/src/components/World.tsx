import { Controls } from "../App";
import { Player, GameProps } from "..";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Box, useKeyboardControls } from "@react-three/drei";

export const World = (gameProps: GameProps) => {
  const player = useRef<RapierRigidBody>(null);
  //   const
  const jump = () => {
    if (player.current && isOnFloor.current) {
      player.current.applyImpulse({ x: 0, y: 5, z: 0 }, true);
      isOnFloor.current = false;
      console.log("impulse applied");
    }
  };

  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  useFrame(() => {
    if (jumpPressed) {
      console.log(isOnFloor);
      jump();
    }
  });

  const isOnFloor = useRef(true);

  return (
    <Suspense>
      <Physics>
        <RigidBody
          ref={player}
          colliders="cuboid"
          onCollisionEnter={({ other }) => {
            if (
              other.rigidBodyObject &&
              other.rigidBodyObject.name === "floor"
            ) {
              isOnFloor.current = true;
              console.log("on collision enter!!!!!!!!!!");
            }
          }}
          onCollisionExit={({ other }) => {
            if (
              other.rigidBodyObject &&
              other.rigidBodyObject.name === "floor"
            ) {
              isOnFloor.current = false;
              console.log("on collision exit!!!!!!!!!!");
            }
          }}
        >
          <Player ref={gameProps.player.characterModel} {...gameProps} />
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
