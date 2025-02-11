import {
  useGameStore,
  GameState,
  usePlayerStore,
  PlayerDefaults,
  useEnemyStore,
  GameStage,
} from '../';

export const MainMenu = () => {
  const { setGameState, setGameStage } = useGameStore();
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
