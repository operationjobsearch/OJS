import {
  initializeGameFolder,
  initializePlayerFolder,
  useGameStore,
  usePlayerStore,
} from "..";
import GUI from "lil-gui";
import { useEffect } from "react";

export const DebugPanel = () => {
  const game = useGameStore();
  const player = usePlayerStore();

  useEffect(() => {
    const gui = new GUI();

    initializeGameFolder(gui, game, player);
    initializePlayerFolder(gui, player);

    return () => {
      gui.destroy();
    };
  }, []);

  return null;
};
