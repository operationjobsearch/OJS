import React, { useEffect } from "react";
import {
  GameObject,
  GameProps,
  initializeGameFolder,
  initializePlayerFolder,
  KeyboardLayout,
  PlayerObject,
} from "..";
import GUI from "lil-gui";

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
