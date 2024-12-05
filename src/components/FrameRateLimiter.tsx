import { Canvas, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";

export const FrameRateLimiter = ({ fps = 60 }: { fps: number }) => {
  const { advance, set, frameloop: initFrameloop } = useThree();

  useLayoutEffect(() => {
    let elapsed = 0;
    let then = 0;
    let raf: number = 0;

    const interval = 1000 / fps;

    function tick(t: number) {
      raf = requestAnimationFrame(tick);
      elapsed = t - then;
      if (elapsed > interval) {
        // @ts-ignore
        // Reason: `advance` is safe to call without arguments in this specific context.
        advance();
        then = t - (elapsed % interval);
      }
    }

    // Set frameloop to never, it will shut down the default render loop
    set({ frameloop: "never" });

    // Kick off custom render loop
    raf = requestAnimationFrame(tick);

    // Restore initial setting
    return () => {
      cancelAnimationFrame(raf);
      set({ frameloop: initFrameloop });
    };
  }, [fps]);

  return null;
};
