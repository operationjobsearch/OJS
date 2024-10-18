import {
  GameObject,
  PlayerObject,
  CameraController,
  DebugPanel,
  World,
  GameProps,
  Reticle,
} from ".";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";

export const App = () => {
  const game: GameObject = {
    keyboardLayout: "QWERTY",
  };

  const player: PlayerObject = {
    characterModel: useRef<THREE.Mesh>(null),
    characterRigidBody: useRef<RapierRigidBody>(null),
    mouseMovement: useRef<{ x: number; y: number }>({ x: 0, y: 0 }),
    reticle: useRef<THREE.Mesh>(null),
    moveSpeed: 1,
    health: 100,
  };

  const gameProps: GameProps = {
    game: game,
    player: player,
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement && player.mouseMovement.current) {
        player.mouseMovement.current.x = e.movementX;
        player.mouseMovement.current.y = e.movementY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="canvas" onClick={() => document.body.requestPointerLock()}>
      <Canvas>
        <DebugPanel {...gameProps} />
        <CameraController {...gameProps} />
        <Reticle {...gameProps} />
        <World {...gameProps} />
        <ambientLight />
      </Canvas>
    </div>
  );
};
