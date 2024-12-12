import {
  GameObject,
  PlayerObject,
  Camera,
  DebugPanel,
  World,
  GameProps,
  Reticle,
  FrameRateLimiter,
  Coordinate,
  handleMouseMove,
  handlePointerLockChange,
  handleWindowFocus,
  handleWindowBlur,
} from ".";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";

/**
 * --------------------------------------------FUNCTIONS---------------------------------------------
 *
 * The App function is a React functional component. It's defined as an arrow function.
 *
 * React functional components are reusable JS/TS functions that return React elements using JSX/TSX
 * to render the defined UI that gets shown on the website. They can be reused anywhere throughout
 * the app by calling copies of it to reduce duplicating code. JSX and TSX are supersets of JS and TS
 * that allows one to write HTML-like markup within React.
 *
 * A normal function has an 'arguments' object that can be accessed in the function as a local
 * variable. Normal functions also have a 'this' variable initialization because of hoisting which is
 * the concept of a variable or function being lifted to the top of its global or local scope before
 * the whole code is executed.
 *
 * Arrow functions cannot be used as constructors and cannot be 'declared'. Function declarations
 * involve the 'function' keyword and a name for the function. Function 'expression' occurs when
 * you make a function and no name is assigned; arrow functions are anonymous functions. They do not
 * get hoisted like normal functions and have a slightly different syntax.
 */

/**
 * ----------------------------------------------HOOKS-----------------------------------------------
 *
 * React Hooks are a way to add functionality to functional components in React. Before Hooks,
 * functional components were limited compared to class components, but Hooks add the ability to use
 * state, lifecycle methods, and other React features in functional components.
 *
 * TODO: REVISIT and finish UseEffect explanation
 * UseEffect(() => {}, [dependencies]): performs side effects in functional components, e.g. fetching
 * data. Re-runs every time the dependency array is changed. A re-render is only triggered when the
 * reference to an object in the dependency array changes because the checks for changes are done
 * with shallow comparison. When side effects need to be stopped or a component is unmounted, the
 * cleanup function is used to prevent errors.
 *
 * UseRef(initialValue): takes a value of any type and returns a reference object with a 'current'
 * property that is initially set to the value provided. The 'ref.current' property is mutable.
 * Changing 'ref.current' doesn't trigger re-renders. If you pass a ref object to react as a ref
 * attribute on a JSX or TSX node, React will set the object's 'current' property.
 */

export const App = () => {
  const game: GameObject = {
    // State
    fps: 60,
    isPointerLocked: false,
    isWindowActive: true,

    // Settings
    keyboardLayout: "QWERTY",

    // Camera
    cameraAngleTheta: 0,
    cameraAnglePhi: Math.PI / 6,
    cameraRadius: 3,
    cameraVerticalOffset: 2.5,
    cameraLookAtOffset: 1.25,
    cameraSpeedRatio: 0.1,
  };

  const player: PlayerObject = {
    // Refs
    characterModel: useRef<THREE.Object3D>(null),
    rigidBody: useRef<RapierRigidBody>(null),
    mouseMovement: useRef<Coordinate>({ x: 0, y: 0 }),

    // State
    modelRotation: Math.PI,
    isWalking: false,
    isRunning: false,
    isOnFloor: true,
    canMove: true,

    controls: {
      forward: { value: "w", isPressed: false },
      left: { value: "a", isPressed: false },
      back: { value: "s", isPressed: false },
      right: { value: "d", isPressed: false },
      jump: { value: " ", isPressed: false },
    },
    directions: {
      forwardVector: new THREE.Vector3(),
      leftVector: new THREE.Vector3(),
      backVector: new THREE.Vector3(),
      rightVector: new THREE.Vector3(),
    },

    // Stats
    velocity: 200,
    runMultiplier: 1.5,
    jumpVelocity: 5,
    health: 100,
    projectileVelocity: 10,
    projectileDamage: 5,
  };

  const gameProps: GameProps = {
    game: game,
    player: player,
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e, player);
    const onPointerLockChange = () => handlePointerLockChange(game);
    const onFocus = () => handleWindowFocus(game);
    const onBlur = () => handleWindowBlur(game);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onPointerLockChange);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
    };
  }, []);

  return (
    <div className="canvas" onClick={() => document.body.requestPointerLock()}>
      <Canvas>
        <FrameRateLimiter fps={game.fps} />
        <DebugPanel {...gameProps} />
        <Camera {...gameProps} />
        <World {...gameProps} />
        <ambientLight />
      </Canvas>
      <Reticle {...gameProps} />
    </div>
  );
};
