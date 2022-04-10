import classNames from 'classnames';
import PropTypes from 'prop-types';

const Rules = ({ rules, toggleRules }) => {
  console.log(rules);
  const className = classNames({
    info: true,
    hidden: !rules,
  });

  const infoText = !rules ? 'Show rules' : 'Hide rules';
  return (
    <div className="rules">
      <span className="rules-toggle" onClick={() => toggleRules()}>
        {infoText}
      </span>
      <p className={className}>
        Try to guess the pattern, in both order and color, within ten turns.
        After submitting a row, a small black peg is placed for each code peg
        from the guess which is correct in both color and position. A white peg
        indicates the existence of a correct color code peg placed in the wrong
        position. More info on{' '}
        <a
          rel="noreferrer"
          href="https://en.wikipedia.org/wiki/Mastermind_(board_game)"
          target="_blank"
        >
          Wikipedia
        </a>
        .
      </p>
    </div>
  );
};

Rules.propTypes = {
  rules: PropTypes.bool,
  toggleRules: PropTypes.func,
};

export default Rules;
