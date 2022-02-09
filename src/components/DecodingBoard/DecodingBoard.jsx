import Row from '../Row';

const generateRow = (rows, rowName, state, activatePeg, submitPegs) => {
  rowName = `decodeRow-${i + 1}`;
  rows.push(
    <Row
      name={rowName}
      key={i + 1}
      rowId={i}
      state={state}
      activatePeg={activatePeg}
      submitPeg={submitPegs}
    />,
  );
};
const DecodingBoard = (state, activatePeg, submitPegs) => {
  const rows = [];
  let rowName;
  generateRow(rows, rowName, state, activatePeg, submitPegs);
};

export default DecodingBoard;
