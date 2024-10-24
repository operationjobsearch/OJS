import {
  GameObject,
  PlayerObject,
  CameraController,
  DebugPanel,
  World,
  GameProps,
  Reticle,
  Coordinate,
  handleMouseMove,
  handlePointerLockChange,
  handleWindowFocus,
  handleWindowBlur,
  Controls,
} from ".";
import * as THREE from "three";
import { useEffect, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";

export const App = () => {
  const game: GameObject = {
    // State
    isPointerLocked: false,
    isWindowActive: true,

    // Settings
    keyboardLayout: "QWERTY",

    // Camera
    cameraAngleTheta: 0,
    cameraAnglePhi: Math.PI / 6,
    cameraRadius: 3,
    cameraVerticalOffset: 2.5,
    cameraLookAtOffset: 1,
  };

  const player: PlayerObject = {
    characterModel: useRef<THREE.Mesh>(null),
    rigidBody: useRef<RapierRigidBody>(null),
    mouseMovement: useRef<Coordinate>({ x: 0, y: 0 }),
    reticle: useRef<THREE.Mesh>(null),
    isOnFloor: true,
    moveSpeed: 1,
    health: 100,
    impulse: 0.5,
  };

  const gameProps: GameProps = {
    game: game,
    player: player,
  };

  const map = useMemo(
    () => [
      {
        name: Controls.forward,
        keys: [game.keyboardLayout === "QWERTY" ? "KeyW" : "KeyW"],
      },
      {
        name: Controls.left,
        keys: [game.keyboardLayout === "QWERTY" ? "KeyA" : "KeyA"],
      },
      {
        name: Controls.backward,
        keys: [game.keyboardLayout === "QWERTY" ? "KeyS" : "KeyR"],
      },
      {
        name: Controls.right,
        keys: [game.keyboardLayout === "QWERTY" ? "KeyD" : "KeyS"],
      },
      { name: Controls.jump, keys: ["Space"] },
    ],
    [game.keyboardLayout]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e, player);
    const onPointerLockChange = () => handlePointerLockChange(game);
    const onFocus = () => handleWindowFocus(game);
    const onBlur = () => handleWindowBlur(game);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onPointerLockChange);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
    };
  }, []);

  return (
    <div className="canvas" onClick={() => document.body.requestPointerLock()}>
      <KeyboardControls map={map}>
        <Canvas>
          <DebugPanel {...gameProps} />
          <CameraController {...gameProps} />
          <Reticle {...gameProps} />
          <World {...gameProps} />
          <ambientLight />
        </Canvas>
      </KeyboardControls>
    </div>
  );
};
