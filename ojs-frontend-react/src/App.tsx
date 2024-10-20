import {
  GameObject,
  PlayerObject,
  CameraController,
  DebugPanel,
  World,
  GameProps,
  Reticle,
  Coordinate,
} from ".";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";

export const App = () => {
  const game: GameObject = {
    // State
    isPointerLocked: false,
    isWindowActive: true,

    // Settings
    keyboardLayout: "QWERTY",

    // Camera
    cameraAngleTheta: Math.PI / 2,
    cameraAnglePhi: Math.PI / 6,
    cameraRadius: 3,
    cameraVerticalOffset: 2.5,
    cameraLookAtOffset: 1,
  };

  const player: PlayerObject = {
    characterModel: useRef<THREE.Mesh>(null),
    characterRigidBody: useRef<RapierRigidBody>(null),
    mouseMovement: useRef<Coordinate>({ x: 0, y: 0 }),
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

    const handlePointerLockChange = () => {
      game.isPointerLocked = !!document.pointerLockElement;
    };

    const handleWindowFocus = () => {
      game.isWindowActive = true;
    };

    const handleWindowBlur = () => {
      game.isWindowActive = false;
    };

    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
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
