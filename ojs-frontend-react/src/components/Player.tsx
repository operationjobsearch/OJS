import * as THREE from "three";
import { movePlayer, PlayerProps } from "..";
import { forwardRef, useEffect } from "react";

const Player = forwardRef<THREE.Mesh, PlayerProps>(({ game, player }, ref) => {
  console.log("render");

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
});

export default Player;
