import { movePlayer, GameProps } from "..";
import * as THREE from "three";
import { forwardRef, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

export const Player = forwardRef<THREE.Mesh, GameProps>(
  ({ game, player }, ref) => {
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        movePlayer(e, game.keyboardLayout, player);
      };

      console.log("keyboard layout changed to: ", game.keyboardLayout);
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [game.keyboardLayout]);

    return (
      <RigidBody>
        <Box ref={ref} position={[0, 0, 0]}>
          <meshStandardMaterial />
        </Box>
      </RigidBody>
    );
  }
);
