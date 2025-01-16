import { Player, useGameStore } from "..";
import { Suspense } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

export const World = () => {
  const { isDebugEnabled } = useGameStore();

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
