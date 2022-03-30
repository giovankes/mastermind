import classNames from 'classnames';

const EndGame = ({ success, reloadGame, endGame }) => {
  const endGameInfoClass = classNames({
    endgame: true,
    hidden: !endGame,
  });

  const endGameStatusClass = classNames({
    'endgame-relative': true,
    success: success,
    failure: !success,
  });
  const infoText = success ? 'GZ' : 'GO';

  return (
    <div className={endGameInfoClass}>
      <div className={endGameStatusClass}>
        <h2 className="endgame-header">{infoText}</h2>
        <button className="endgame-btn" onClick={() => reloadGame()}>
          PLay again
        </button>
      </div>
      <div className="endgame-relative endgame-overlay" />
    </div>
  );
};

export default EndGame;
