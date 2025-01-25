import { Camera, DebugPanel, World, useGameStore, usePlayerStore } from ".";
import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";

export const App = () => {
  const { setMouseMovement } = usePlayerStore();
  const { setFocus, setBlur, setPointerLockChange } = useGameStore();

  useEffect(() => {
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
        <DebugPanel />
        <Camera />
        <World />
        <ambientLight />
      </Canvas>
    </div>
  );
};
