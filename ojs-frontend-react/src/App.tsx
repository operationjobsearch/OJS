import * as THREE from "three";
import { GameConfig, KeyboardLayout, PlayerConfig } from "./lib";
import GUI from "lil-gui";
import { Player, CameraController } from "./components";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const App = () => {
  const gameObject: GameConfig = {
    keyboardLayout: "QWERTY",
  };

  const playerConfig: PlayerConfig = {
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

    playerFolder.add(playerConfig, "moveSpeed");
    playerFolder.add(playerConfig, "health", 0, 100);

    return () => {
      gui.destroy();
    };
  }, [gameObject]);

  return (
    <Canvas style={{ width: "100vw", height: "100vh", background: "white" }}>
      <CameraController playerRef={playerConfig.playerRef} />
      <Player
        ref={playerConfig.playerRef}
        gameObject={gameObject}
        playerConfig={playerConfig}
      />
      <ambientLight />
    </Canvas>
  );
};

export default App;
