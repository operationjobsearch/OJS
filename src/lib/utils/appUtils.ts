import { GameObject } from "../..";

export const handleMouseMove = (
  e: MouseEvent,
  player: { mouseMovement: React.RefObject<{ x: number; y: number }> }
) => {
  if (document.pointerLockElement && player.mouseMovement.current) {
    player.mouseMovement.current.x = e.movementX;
    player.mouseMovement.current.y = e.movementY;
  }
};

export const handlePointerLockChange = (game: GameObject) => {
  game.isPointerLocked = !!document.pointerLockElement;
};

export const handleWindowFocus = (game: GameObject) => {
  game.isWindowActive = true;
};

export const handleWindowBlur = (game: GameObject) => {
  game.isWindowActive = false;
};
