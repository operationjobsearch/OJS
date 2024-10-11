import { KeyboardLayout, PlayerObject } from "../..";
import gsap from "gsap";

export const movePlayer = (
  event: KeyboardEvent,
  keyboardLayout: KeyboardLayout,
  playerConfig: PlayerObject
): void => {
  if (!playerConfig.modelRef.current) return;

  const currentPos = playerConfig.modelRef.current.position.clone();
  const duration = 0.5;

  switch (event.key) {
    // forward
    case keyboardLayout === "QWERTY" ? "w" : "w":
      gsap.to(playerConfig.modelRef.current.position, {
        z: currentPos.z - playerConfig.moveSpeed,
        duration,
      });
      break;
    // left
    case keyboardLayout === "QWERTY" ? "a" : "a":
      gsap.to(playerConfig.modelRef.current.position, {
        x: currentPos.x - playerConfig.moveSpeed,
        duration,
      });
      break;
    // backward
    case keyboardLayout === "QWERTY" ? "s" : "r":
      gsap.to(playerConfig.modelRef.current.position, {
        z: currentPos.z + playerConfig.moveSpeed,
        duration,
      });
      break;
    // right
    case keyboardLayout === "QWERTY" ? "d" : "s":
      gsap.to(playerConfig.modelRef.current.position, {
        x: currentPos.x + playerConfig.moveSpeed,
        duration,
      });
      break;
    // case " ": // Jump
    //   gsap.to(playerConfig.modelRef.current.position, {
    //     y: currentPos.y + playerConfig.moveSpeed,
    //     duration,
    //   });
    //   break;
    default:
      return; // Ignore other keys
  }
};
