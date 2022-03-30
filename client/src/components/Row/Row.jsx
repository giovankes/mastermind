import classNames from 'classnames';
import PropTypes from 'prop-types';
import DecodeRow from '../DecodeRow';
import SubmitButton from '../SubmitButton';
import HintsRow from '../HintsRow';

const Row = ({ state, rowId, submitPegs, activatePeg, chosenCode }) => {
  const isCurrentRow = state.isCurrentRow === rowId;
  const rowClassName = classNames({
    row: true,
    clearfix: true,
    current: isCurrentRow,
  });

  const hintsRowName = 'hintsRow-' + rowId;
  const rowName = 'decodeRow-' + rowId;

  return (
    <div className={rowClassName}>
      <div className="left">
        <DecodeRow
          submitPegs={submitPegs}
          name={rowName}
          key={rowId}
          rowId={rowId}
          state={state}
          isCurrentRow={isCurrentRow}
          activatePeg={activatePeg}
        />
      </div>
      <div className="left">
        <SubmitButton
          chosenCode={chosenCode}
          creatingCode={state.creatingCode}
          rowId={rowId}
          state={state}
          submitPegs={submitPegs}
        />
      </div>
      {state.creatingCode !== true && (
        <div className="right">
          <HintsRow
            name={hintsRowName}
            key={rowId}
            rowId={rowId}
            state={state}
          />
        </div>
      )}
    </div>
  );
};

export default Row;
