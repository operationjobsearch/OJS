import { movePlayer, GameProps } from "..";
import * as THREE from "three";
import { forwardRef, useEffect } from "react";

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
      <mesh ref={ref}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    );
  }
);
