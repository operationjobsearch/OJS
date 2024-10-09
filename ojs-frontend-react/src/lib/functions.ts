import { KeyboardLayout, PlayerProps } from "./";
import gsap from "gsap";

export const handleMovement = (
  event: KeyboardEvent,
  keyboardLayout: KeyboardLayout,
  playerProps: PlayerProps
): void => {
  if (!playerProps.playerRef.current) return;

  const currentPos = playerProps.playerRef.current.position.clone();
  const duration = 0.5;

  switch (event.key) {
    // forward
    case keyboardLayout === "QWERTY" ? "w" : "w":
      gsap.to(playerProps.playerRef.current.position, {
        z: currentPos.z - playerProps.moveSpeed,
        duration,
      });
      break;
    // left
    case keyboardLayout === "QWERTY" ? "a" : "a":
      gsap.to(playerProps.playerRef.current.position, {
        x: currentPos.x - playerProps.moveSpeed,
        duration,
      });
      break;
    // backward
    case keyboardLayout === "QWERTY" ? "s" : "r":
      gsap.to(playerProps.playerRef.current.position, {
        z: currentPos.z + playerProps.moveSpeed,
        duration,
      });
      break;
    // right
    case keyboardLayout === "QWERTY" ? "d" : "s":
      gsap.to(playerProps.playerRef.current.position, {
        x: currentPos.x + playerProps.moveSpeed,
        duration,
      });
      break;
    case " ": // Jump
      gsap.to(playerProps.playerRef.current.position, {
        y: currentPos.y + playerProps.moveSpeed,
        duration,
      });
      break;
    default:
      return; // Ignore other keys
  }
};

export const moveCamera = (): void => {};
