import {
  Player,
  GameProps,
  Projectile,
  ProjectileProps,
  createProjectile,
} from "..";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

/**
 * ----------------------------------------------HOOKS-----------------------------------------------
 *
 * useCallback(fn, dependencies): accepts as a first parameter a function and returns a memoized
 * version of it (in terms of its memory location, not the computation done within the function).
 * Meaning that the returned function doesn't get recreated on a new memory reference every time the
 * component re-renders, while a normal function inside a component does. The returned function ges
 * recreated on a new memory reference if one of the vas in the dependency array changes.
 *
 * useMemo(calculateValue, dependencies): behaves like useCallback to memoize non-function values
 * such as objects and arrays.
 *
 * Memoization is an optimization technique used primarily to speed up computer programs by storing
 * the results of expensive function calls to pure functions and returning the cached result when the
 * same inputs occur again.
 *
 * useState(initialState): allows you to add a state variable to your component that has an initial
 * value equal to the "initialState" param. The state variable is conventionally defined with array
 * destructuring. useState returns an array with exactly two values, the current state and a set
 * function that lets you update the state to a different value and trigger a re-render.
 */

/**
 * ------------------------------------------ARRAY FUNCTIONS-----------------------------------------
 *
 * A callback function is a function to execute for each element in the array. The callback function
 * has access to each element, the index, and the original array. The callback function syntax is:
 * arrayFn((element, index, array) => {}).
 *
 * filter(callback fn): filters out a subset from a superset that pass a condition determined by a
 * callback function, which then creates a new array. This does not change the original array.
 * Because objects are not iterable, objects need to be converted to an array using static methods,
 * e.g. Object.keys(), so the filter method can then be used on the object.
 *
 * map(callback fn): iterates over an array and modifies the elements using the callback function,
 * and then creates a new array with the modified elements. The original array is not changed.
 */

/**
 * -----------------------------------------ASYNC EXECUTION------------------------------------------
 *
 * Asynchronous programming allows the program to start a possibly long-running task and still be
 * responsive to other events while the long task runs instead of waiting for it to finish first.
 * To create an asynchronous function, you use the async keyword before the function name, which
 * creates an AsyncFunction object. The syntax is: async function fnName() {};. It can also use the
 * arrow syntax: const fnName = async() => {};. By putting the "async" keyword, it makes the function
 * always return a Promise, even if the return value is not explicitly defined. The async function
 * can have zero or more "await" expressions. Await is used to unwrap promises by passing a Promise
 * as the expression. Await returns the fulfillment value of the promise. This await keyword can only
 * be used inside an async function. Await expressions pauses the execution of the function until the
 * returned promise is either fulfilled or rejected, making the function behave as if synchronous. If
 * the promise is rejected, the await expression throws the rejected value. Using "async" and "await"
 * allows the use of "try"/"catch" blocks around async code to catch any rejection from the returned
 * Promise.
 *
 * Promise objects represent the eventual completion or failure of an asynchronous operation and its
 * resulting value. A promise is a proxy for a value not necessarily known when the promise is
 * created. It allows you to associate handlers with an asynchronous action's eventual success or
 * failure reason. Promises can be pending (the operation is in its initial state, neither fulfilled
 * or rejected), fulfilled (the operation completed successfully), or rejected (the operation
 * failed). A promise is "settled" if it is either fulfilled or rejected, but not pending. The
 * promise method "then()", "catch()", and "finally()" are used to associate further action with a
 * promise that becomes settled. The "then()" method takes up to two arguments; the first being a
 * callback function for the fulfilled case of the promise and the second being a callback for the
 * rejected case.
 *
 * Suspense is a react component that lets you display a fallback until its children have finished
 * loading. The fallback is an alternate UI to render in the place of the actual UI if it hasn't
 * finished loading. Suspense will switch to fallback when children suspends and back to children
 * when the data is ready. Suspense can show a loading screen while waiting for child components to
 * meet certain conditions. Suspense delays rendering of child components and can be used to prevent
 * component renders until data is fetched, lazy loading is done, or another asynchronous task is
 * completed.
 */

export const World = ({ game, player }: GameProps) => {
  const { camera } = useThree();
  const [projectiles, setProjectiles] = useState<any[]>([]);

  // TODO: move fireProjectile and removeProjectile to projectileUtils.ts
  const fireProjectile = useCallback((newProjectile: ProjectileProps) => {
    setProjectiles((prev) => [...prev, newProjectile]);
  }, []);

  const removeProjectile = useCallback((id: number) => {
    setProjectiles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!(game.isPointerLocked && game.isWindowActive)) return;
      fireProjectile(createProjectile(player, camera, true));
      console.log(projectiles);
    };

    document.addEventListener("click", handleMouseDown);
    return () => {
      document.removeEventListener("click", handleMouseDown);
    };
  }, [projectiles]);

  return (
    <Suspense>
      <Physics debug={true} timeStep={1 / game.fps}>
        <Player {...{ game, player }} />
        {/* Render all projectiles */}
        {projectiles.map((projectile) => (
          <Projectile
            key={projectile.id}
            id={projectile.id}
            position={projectile.position}
            direction={projectile.direction}
            velocity={projectile.speed}
            isFriendly={projectile.isFriendly}
            onExpire={() => removeProjectile(projectile.id)}
          />
        ))}
        <RigidBody colliders="cuboid" type="fixed" name="floor" friction={0}>
          <Box position={[0, -1, 0]} args={[10, 1, 10]}>
            <meshStandardMaterial color="blue" />
          </Box>
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
