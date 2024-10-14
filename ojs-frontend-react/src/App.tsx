import {
  GameObject,
  PlayerObject,
  Player,
  CameraController,
  DebugPanel,
} from ".";
import * as THREE from "three";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";

export const App = () => {
  const game: GameObject = {
    keyboardLayout: "QWERTY",
  };

  const player: PlayerObject = {
    modelRef: useRef<THREE.Mesh>(null),
    moveSpeed: 1,
    health: 100,
  };

  return (
    <div className="canvas">
      <Canvas resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}>
        <DebugPanel player={player} game={game} />
        <CameraController modelRef={player.modelRef} />
        <Player ref={player.modelRef} game={game} player={player} />
        <ambientLight />
      </Canvas>
    </div>
  );
};
