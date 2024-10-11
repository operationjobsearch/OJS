import * as THREE from "three";
import { GameObject, PlayerObject, Player, CameraController, Canvas } from ".";
import { useRef } from "react";
import { DebugPanel } from "./components/DebugPanel";

const App = () => {
  const game: GameObject = {
    keyboardLayout: "QWERTY",
  };

  const player: PlayerObject = {
    modelRef: useRef<THREE.Mesh>(null),
    moveSpeed: 1,
    health: 100,
  };

  return (
    <Canvas style={{ width: "100vw", height: "100vh", background: "black" }}>
      <DebugPanel player={player} game={game} />
      <CameraController modelRef={player.modelRef} />
      <Player ref={player.modelRef} game={game} player={player} />
      <ambientLight />
    </Canvas>
  );
};

export default App;
