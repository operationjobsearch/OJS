import { useGameStore, EndMenuProps, GameState } from '../..';

export const EndMenu = ({ endState }: EndMenuProps) => {
  const { setGameState } = useGameStore();

  if (endState === GameState.Won) {
    return (
      <div>
        <h1>Victory</h1>
        <button onClick={() => setGameState(GameState.MainMenu)}>return to main menu</button>
      </div>
    );
  }
  return (
    <div>
      <h1>Defeat</h1>
      <button onClick={() => setGameState(GameState.MainMenu)}>return to main menu</button>
    </div>
  );
};
