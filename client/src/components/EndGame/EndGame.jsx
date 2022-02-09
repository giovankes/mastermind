import classNames from 'classnames';

const EndGame = (endGame, success, reloadGame) => {
  const endGameInfoClass = classNames({
    endgame: true,
    hidden: !endGame,
  });
  const endGameStatusClass = classNames({
    endgamerelative: true,
    success,
    failure: !success,
  });
  const infoText = success ? 'congratulations' : 'game over';

  return (
    <div className={endGameInfoClass}>
      <div className={endGameStatusClass}>
        <h2 className="endgame-header">{infoText}</h2>
        <button className="endgame-btn" onClick={() => reloadGame()}>
          play again
        </button>
      </div>
      <div className="endgame-relative endgame-overlay" />
    </div>
  );
};

export default EndGame;
