import { Box } from '@react-three/drei';
import { interactionGroups, RigidBody } from '@react-three/rapier';
import { useGameStore, CollisionGroups, GameStage, GameState, usePlayerStore } from '../../..';
import { useEffect } from 'react';

export const StageManager = () => {
  const { health } = usePlayerStore();
  const { currentStage, isStageCleared, advanceGame, setStageCleared, setGameState } =
    useGameStore();

  useEffect(() => {
    if (isStageCleared) {
      // TODO: replace with interactable item or door in game to proceed to next stage
      // console.log('advancing');
      advanceGame();
      setStageCleared(false);
    }
  }, [isStageCleared]);

  useEffect(() => {
    if (health <= 0) {
      setGameState(GameState.Lost);
    }
  }, [health]);

  switch (currentStage) {
    case GameStage.Application:
      return (
        <RigidBody colliders="cuboid" type="fixed" name="floor" friction={0}>
          <Box position={[0, 0, 0]} args={[100, 1, 100]}>
            <meshStandardMaterial color="blue" />
          </Box>
        </RigidBody>
      );
    case GameStage.Assessment:
      return (
        <RigidBody colliders="cuboid" type="fixed" name="floor" friction={0}>
          <Box position={[0, 0, 0]} args={[100, 1, 100]}>
            <meshStandardMaterial color="green" />
          </Box>
        </RigidBody>
      );
    case GameStage.Interview:
      return (
        <RigidBody colliders="cuboid" type="fixed" name="floor" friction={0}>
          <Box position={[0, 0, 0]} args={[100, 1, 100]}>
            <meshStandardMaterial color="purple" />
          </Box>
        </RigidBody>
      );
  }
};
