import classNames from 'classnames';
import PropTypes from 'prop-types';
const SubmitButton = ({ state, rowId, submitPegs }) => {
  const className = classNames({
    submit: true,
    hidden: !(
      state.currentGuess.size >= state.pegsInRow && state.currentRow === rowId
    ),
  });
  return <button className={className} onClick={() => submitPegs()} />;
};

SubmitButton.propTypes = {
  state: PropTypes.object,
  rowId: PropTypes.number,
  submitPegs: PropTypes.func,
};

export default SubmitButton;
