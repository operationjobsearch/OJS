import { useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";
import { GameProps } from "../lib/types";

export const CameraController = ({ player }: GameProps) => {
  const { camera } = useThree();
  const radius = 3; // Adjusted distance between camera and player
  const verticalOffset = 2.5; // Increased height offset to keep the camera above the player
  const lookAtOffset = 1; // Offset to look slightly above the player's head
  const [theta, setTheta] = useState(Math.PI / 2); // Horizontal angle (theta)
  const [phi, setPhi] = useState(Math.PI / 6); // Vertical angle (phi)
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [isWindowActive, setIsWindowActive] = useState(true);

  // Handle pointer lock and window focus states
  useEffect(() => {
    const handlePointerLockChange = () => {
      setIsPointerLocked(!!document.pointerLockElement);
    };

    const handleWindowFocus = () => {
      setIsWindowActive(true);
    };

    const handleWindowBlur = () => {
      setIsWindowActive(false);
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  // Update camera position based on mouse movement
  useFrame(() => {
    if (
      !(player.characterModel.current && player.mouseMovement.current) ||
      !isPointerLocked ||
      !isWindowActive
    ) {
      return;
    }

    // Capture mouse deltas and reset them after use to avoid momentum-like behavior
    const mouseDeltaX = -player.mouseMovement.current.x * 0.001;
    const mouseDeltaY = player.mouseMovement.current.y * 0.001;

    player.mouseMovement.current.x = 0;
    player.mouseMovement.current.y = 0;

    // Update horizontal and vertical angles
    const newTheta = theta + mouseDeltaX;
    const newPhi = Math.max(
      -Math.PI / 3,
      Math.min(Math.PI / 3, phi + mouseDeltaY)
    );

    // Calculate the new camera position using spherical coordinates
    const x =
      player.characterModel.current.position.x +
      radius * Math.sin(newTheta) * Math.cos(newPhi);
    const y =
      player.characterModel.current.position.y +
      radius * Math.sin(newPhi) +
      verticalOffset;
    const z =
      player.characterModel.current.position.z +
      radius * Math.cos(newTheta) * Math.cos(newPhi);

    camera.position.set(x, y, z);

    // Make the camera look slightly above the player's head
    const lookAtPosition = player.characterModel.current.position.clone();
    lookAtPosition.y += lookAtOffset;
    camera.lookAt(lookAtPosition);

    setTheta(newTheta);
    setPhi(newPhi);
  });

  return null;
};
