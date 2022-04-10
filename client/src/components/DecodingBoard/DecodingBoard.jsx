import Row from '../Row';
import { times } from '../../utils';

const generateRow = ({ i, chosenCode, state, activatePeg, submitPegs }) => {
  let rows = [];
  let rowName;
  console.log(state);
  rowName = 'decodeRow- ' + i + 1;
  rows.push(
    <Row
      chosenCode={chosenCode}
      creatingCode={state.creatingCode}
      name={rowName}
      key={i + 1}
      rowId={i}
      state={state}
      activatePeg={activatePeg}
      submitPegs={submitPegs}
    />
  );
  return rows;
};

const DecodingBoard = ({ chosenCode, state, activatePeg, submitPegs }) => {
  const rows = times(state.attempts)(generateRow);
  console.log(rows);
  return;
};

export default DecodingBoard;
