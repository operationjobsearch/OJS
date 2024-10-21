import { GameProps, initializeGameFolder, initializePlayerFolder } from "..";
import GUI from "lil-gui";
import { useEffect } from "react";

export const DebugPanel = ({ player, game }: GameProps) => {
  useEffect(() => {
    const gui = new GUI();

    initializeGameFolder(gui, game);
    initializePlayerFolder(gui, player);

    return () => {
      gui.destroy();
    };
  }, []);

  return null;
};
