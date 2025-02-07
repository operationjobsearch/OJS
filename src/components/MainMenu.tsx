import { useGameStore, GameState } from '../';

export const MainMenu = () => {
  const { setGameState } = useGameStore();

  return (
    <>
      <div className="menu">
        <button
          className="menu-button"
          onClick={() => {
            document.body.requestPointerLock({ unadjustedMovement: true });
            setGameState(GameState.Active);
          }}
        >
          Start Game
        </button>
      </div>
    </>
  );
};
