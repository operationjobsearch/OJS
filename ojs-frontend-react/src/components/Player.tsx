import * as THREE from "three";
import { movePlayer, PlayerProps } from "../lib";
import { MeshProps } from "@react-three/fiber";
import { forwardRef, useEffect } from "react";

const Player = forwardRef<THREE.Mesh, PlayerProps>(
  ({ gameObject, playerConfig }, ref) => {
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        movePlayer(e, gameObject.keyboardLayout, playerConfig);
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [gameObject.keyboardLayout]);

    return (
      <mesh ref={ref}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    );
  }
);

export default Player;
