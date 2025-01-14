import {
  Camera,
  DebugPanel,
  World,
  Reticle,
  FrameRateLimiter,
  useGameStore,
  usePlayerStore,
} from ".";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

export const App = () => {
  const { setMouseMovement, setCharacterModel, setRigidBody } =
    usePlayerStore();
  const { setFocus, setBlur, setPointerLockChange } = useGameStore();
  const rigidBody = useRef<RapierRigidBody>(null);
  const characterModel = useRef<THREE.Object3D>(null);

  useEffect(() => {
    setRigidBody(rigidBody);
    setCharacterModel(characterModel);

    window.addEventListener("focus", setFocus);
    window.addEventListener("blur", setBlur);
    window.addEventListener("mousemove", setMouseMovement);
    document.addEventListener("pointerlockchange", setPointerLockChange);

    return () => {
      window.removeEventListener("focus", setFocus);
      window.removeEventListener("blur", setBlur);
      window.removeEventListener("mousemove", setMouseMovement);
      document.removeEventListener("pointerlockchange", setPointerLockChange);
    };
  }, []);

  return (
    <div className="canvas" onClick={() => document.body.requestPointerLock()}>
      <Canvas>
        <FrameRateLimiter />
        <DebugPanel />
        <Camera />
        <World />
        <ambientLight />
      </Canvas>
      <Reticle />
    </div>
  );
};
