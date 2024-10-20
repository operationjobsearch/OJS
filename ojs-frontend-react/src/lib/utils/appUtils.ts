import { GameObject } from "../..";

export const handleWindowFocus = (game: GameObject) => {
  game.isWindowActive = true;
};

export const handleWindowBlur = (game: GameObject) => {
  game.isWindowActive = false;
};
