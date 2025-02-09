import { useGameStore, GameState, usePlayerStore, PlayerDefaults, useEnemyStore } from '../';

export const MainMenu = () => {
  const { setGameState } = useGameStore();
  const { resetEnemies } = useEnemyStore();
  const { setPlayer } = usePlayerStore();

  return (
    <>
      <div className="menu">
        <button
          className="menu-button"
          onClick={() => {
            document.body.requestPointerLock({ unadjustedMovement: true });
            resetEnemies();
            setPlayer(PlayerDefaults);
            setGameState(GameState.Active);
          }}
        >
          Start Game
        </button>
      </div>
    </>
  );
};
