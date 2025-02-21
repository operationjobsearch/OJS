import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { MainMenu, EndMenu, Game, GameState, useGameStore } from '.';
import { useMemo } from 'react';

export const App = () => {
  const { gameState } = useGameStore();

  enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',

    dash = 'dash',
    interact = 'interact',
  }

  const controlsMap = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },

      { name: Controls.dash, keys: ['Space'] },
      { name: Controls.interact, keys: ['KeyE'] },
    ],
    []
  );

  switch (gameState) {
    case GameState.MainMenu:
      return <MainMenu />;
    case GameState.Active:
      return (
        <KeyboardControls map={controlsMap}>
          <Game />;
        </KeyboardControls>
      );
    case GameState.Lost:
      return <EndMenu endState={GameState.Lost} />;
    case GameState.Won:
      return <EndMenu endState={GameState.Won} />;
  }
};
