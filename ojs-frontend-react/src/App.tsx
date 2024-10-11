import * as THREE from "three";
import {
  GameObject,
  KeyboardLayout,
  PlayerObject,
  Player,
  CameraController,
} from ".";
import GUI from "lil-gui";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const App = () => {
  const game: GameObject = {
    keyboardLayout: "QWERTY",
  };

  const player: PlayerObject = {
    modelRef: useRef<THREE.Mesh>(null),
    moveSpeed: 1,
    health: 100,
  };

  useEffect(() => {
    // TODO: consider leva as an alternative to lil-gui, move debug panel to separate component
    const gui = new GUI();
    const gameFolder = gui.addFolder("game");
    const playerFolder = gui.addFolder("player");

    gameFolder
      .add(game, "keyboardLayout", ["QWERTY", "Colemak"])
      .onChange((value: KeyboardLayout) => {
        console.log("keyboard layout changed to: ", value);
      });

    playerFolder.add(player, "moveSpeed");
    playerFolder.add(player, "health", 0, 100);

    return () => {
      gui.destroy();
    };
  }, []);

  return (
    <Canvas style={{ width: "100vw", height: "100vh", background: "white" }}>
      <CameraController modelRef={player.modelRef} />
      <Player ref={player.modelRef} game={game} player={player} />
      <ambientLight />
    </Canvas>
  );
};

export default App;
