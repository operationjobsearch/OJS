import GUI from "lil-gui";
import { GameObject, KeyboardLayout, PlayerObject } from "../types";

// TODO: update functions to use zustand setters somehow so necessary re-renders trigger
export const initializeGameFolder = (
  panel: GUI,
  game: GameObject,
  player: PlayerObject
): void => {
  const gameFolder = panel.addFolder("game");

  gameFolder
    .add(game, "keyboardLayout", ["QWERTY", "Colemak"])
    .onChange((value: KeyboardLayout) => {
      const controls = player.controls;

      if (value === "QWERTY") {
        controls.back.value = "s";
        controls.right.value = "d";
      } else {
        controls.back.value = "r";
        controls.right.value = "s";
      }
      console.log("keyboard layout changed to: ", value);
    });
};

export const initializePlayerFolder = (
  panel: GUI,
  player: PlayerObject
): void => {
  const playerFolder = panel.addFolder("player");

  playerFolder.add(player, "health", 0, 100);
  playerFolder.add(player, "velocity");
  playerFolder.add(player, "jumpVelocity");
};
