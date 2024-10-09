import * as THREE from "three";
import { GameConfig, handleMovement, KeyboardLayout, PlayerProps } from "./lib";
import GUI from "lil-gui";
import { Player, CameraController } from "./components";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const App = () => {
  const gameObject: GameConfig = {
    keyboardLayout: "QWERTY",
  };

  const playerProps: PlayerProps = {
    playerRef: useRef<THREE.Mesh>(null),
    moveSpeed: 1,
    health: 100,
  };

  useEffect(() => {
    const gui = new GUI();
    const gameFolder = gui.addFolder("game");
    const playerFolder = gui.addFolder("player");

    gameFolder
      .add(gameObject, "keyboardLayout", ["QWERTY", "Colemak"])
      .onChange((value: KeyboardLayout) => {
        console.log("keyboard layout changed to: ", value);
      });

    playerFolder.add(playerProps, "moveSpeed");
    playerFolder.add(playerProps, "health", 0, 100);

    return () => {
      gui.destroy();
    };
  }, [gameObject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleMovement(e, gameObject.keyboardLayout, playerProps);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameObject.keyboardLayout]);

  return (
    <Canvas style={{ width: "100vw", height: "100vh", background: "white" }}>
      <CameraController playerRef={playerProps.playerRef} />
      <Player ref={playerProps.playerRef} />
      <ambientLight />
    </Canvas>
  );
};

export default App;
