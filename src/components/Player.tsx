import { GameProps, movePlayer } from "..";
import * as THREE from "three";
import { forwardRef, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

export const Player = forwardRef<THREE.Mesh, GameProps>(
  ({ game, player }, ref) => {
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        movePlayer(player, e.key);
      };

      document.addEventListener("keydown", handleKeyDown);
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
