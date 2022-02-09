import classNames from 'classnames';
import DecodeRow from '../DecodeRow';
import SubmitButton from '../SubmitButton';
import HintsRow from '../HintsRow';

const Row = (currentRow, rowId, activatePeg, state, submitPegs) => {
  const isCurrentRow = currentRow === rowId;
  const rowClassName = classNames({
    row: true,
    clearfix: true,
    current: currentRow,
  });
  const hintsRowName = `hintsRow-${rowId}`;
  const rowName = `decodeRow-${rowId}`;
  return (
    <div className={rowClassName}>
      <div className="left">
        <DecodeRow
          name={rowName}
          key={rowId}
          rowId={rowId}
          state={state}
          isCurrentRow={isCurrentRow}
          activatePeg={activatePeg}
        />
      </div>
      <div className="left">
        <SubmitButton rowId={rowId} state={state} submitPegs={submitPegs} />
      </div>
      <div className="right">
        <HintsRow name={hintsRowName} key={rowId} rowId={rowId} state={state} />
      </div>
    </div>
  );
};

export default Row;
