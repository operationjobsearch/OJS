import * as THREE from "three";

export const moveCamera = (
  camera: THREE.Camera,
  characterModel: React.RefObject<THREE.Mesh>,
  target: React.RefObject<THREE.Mesh>,
  mouseDelta: { x: number; y: number },
  fixedDistance: number // Constant distance between camera and target
): void => {
  if (characterModel.current && target.current) {
    const targetPosition = characterModel.current.position;

    // Rotate the camera based on mouse movement
    rotateCamera(
      camera,
      targetPosition,
      mouseDelta.x,
      mouseDelta.y,
      fixedDistance
    );

    // Ensure the camera is always looking at the target point (not the player directly)
    camera.lookAt(target.current?.position);
  }
};

// Spherical coordinates for camera movement
const spherical = new THREE.Spherical();
const sphericalDelta = new THREE.Spherical();

// Rotation speed factor
const rotateSpeed = 0.01; // Adjust this to control the camera speed

// Rotate the camera based on mouse input
const rotateCamera = (
  camera: THREE.Camera,
  targetPosition: THREE.Vector3,
  deltaX: number,
  deltaY: number,
  fixedDistance: number // The constant distance between the camera and the player
): void => {
  // Get the current spherical coordinates of the camera relative to the target (the player)
  spherical.setFromVector3(camera.position.clone().sub(targetPosition));

  // Adjust the spherical angles based on mouse movement
  spherical.theta -= deltaX * rotateSpeed; // Horizontal rotation (around the Y-axis)
  spherical.phi -= deltaY * rotateSpeed; // Vertical rotation (around the X-axis)

  // Clamp the vertical angle (phi) to prevent flipping the camera upside down
  spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

  // Ensure the radius (distance from the target) stays constant
  spherical.radius = fixedDistance;

  // Convert the spherical coordinates back into a Cartesian vector
  const newPosition = new THREE.Vector3()
    .setFromSpherical(spherical)
    .add(targetPosition);

  // Update the camera's position
  camera.position.copy(newPosition);
};
