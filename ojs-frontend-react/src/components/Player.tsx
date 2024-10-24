import {
  GameProps,
  Controls,
  jump,
  moveForward,
  moveLeft,
  moveBackwards,
  moveRight,
} from "..";
import * as THREE from "three";
import { forwardRef, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import {
  useGLTF,
  useAnimations,
  useKeyboardControls,
  Box,
} from "@react-three/drei";

export const Player = forwardRef<THREE.Mesh, GameProps>(
  ({ game, player }, ref) => {
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "w") {
          moveForward(player);
        }
        if (e.key === "a") {
          moveLeft(player);
        }
        if (game.keyboardLayout === "QWERTY") {
          if (e.key === "s") moveBackwards(player);
          if (e.key === "d") moveRight(player);
        } else if (game.keyboardLayout === "Colemak") {
          if (e.key === "r") moveBackwards(player);
          if (e.key === "s") moveRight(player);
        }
        if (e.key === " ") {
          jump(player);
        }
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
