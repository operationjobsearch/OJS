import { useGameStore, GameState, usePlayerStore, useEnemyStore, GameStage } from '../..';

export const MainMenu = () => {
  const { setGameState, setGameStage } = useGameStore();
  const { resetEnemies } = useEnemyStore();
  const { setPlayer } = usePlayerStore();
  const player = usePlayerStore();

  return (
    <>
      <div className="menu">
        <button
          className="menu-button"
          onClick={() => {
            resetEnemies();
            setPlayer({ ...player, health: 100 });
            setGameStage(GameStage.Application);
            setGameState(GameState.Active);
          }}
        >
          Start Game
        </button>
      </div>
    </>
  );
};
