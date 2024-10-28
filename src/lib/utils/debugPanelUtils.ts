import GUI from "lil-gui";
import { GameObject, KeyboardLayout, PlayerObject } from "../types";

export const initializeGameFolder = (
  panel: GUI,
  game: GameObject,
  player: PlayerObject
): void => {
  const gameFolder = panel.addFolder("game");

  gameFolder
    .add(game, "keyboardLayout", ["QWERTY", "Colemak"])
    .onChange((value: KeyboardLayout) => {
      if (value === "QWERTY") {
        player.controls.backward = "s";
        player.controls.right = "d";
      } else {
        player.controls.backward = "r";
        player.controls.right = "s";
      }
      console.log("keyboard layout changed to: ", value);
    });
};

export const initializePlayerFolder = (
  panel: GUI,
  player: PlayerObject
): void => {
  const playerFolder = panel.addFolder("player");

  playerFolder.add(player, "moveSpeed");
  playerFolder.add(player, "health", 0, 100);
  playerFolder.add(player, "impulse");
};
