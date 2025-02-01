import { Camera, DebugPanel, World, useGameStore, usePlayerStore } from ".";
import { Key, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

export const App = () => {
  const { setMouseMovement } = usePlayerStore();
  const { setFocus, setBlur, setPointerLockChange, setPaused, isPaused } =
    useGameStore();

  const togglePause = (e: KeyboardEvent) => {
    if (e.key == "Escape") {
      console.log("isPaused:", isPaused);
      setPaused(!isPaused);
    }
  };

  useEffect(() => {
    window.addEventListener("focus", setFocus);
    window.addEventListener("blur", setBlur);
    window.addEventListener("mousemove", setMouseMovement);
    document.addEventListener("pointerlockchange", setPointerLockChange);
    window.addEventListener("keydown", togglePause);

    return () => {
      window.removeEventListener("focus", setFocus);
      window.removeEventListener("blur", setBlur);
      window.removeEventListener("mousemove", setMouseMovement);
      document.removeEventListener("pointerlockchange", setPointerLockChange);
      window.removeEventListener("keydown", togglePause);
    };
  }, [isPaused]);

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
