import Row from '../Row';

const generateRow = ({
  i,
  type,
  chosenCode,
  state,
  activatePeg,
  submitPegs,
}) => {
  let rows = [];
  let rowName;
  let type = type;

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
};

const DecodingBoard = ({ chosenCode, state, activatePeg, submitPegs }) => {
  const rows = times(state.attempts)(generateRow);
  console.log(rows);
  return;
};

export default DecodingBoard;
