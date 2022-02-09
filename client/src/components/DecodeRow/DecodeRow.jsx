import Peg from '../Peg';

const generatePeg = ({
  idVal,
  pegs,
  currentRow,
  name,
  currentGuess,
  pegClass,
  i,
  rowId,
}) => {
  idVal = `${name}-${i}1`;
  if (currentRow === rowId) {
    pegClass = currentGuess.get(i) ? 'peg ' + currentGuess.get(i) : 'peg';
  } else {
    pegClass = 'peg';
  }

  pegs.push(
    <Peg
      idVal={idVal}
      name={name}
      value={i + 1}
      key={idVal}
      pegClass={pegClass}
      isCurrentRow={isCurrentRow}
      activatePeg={activatePeg}
    />,
  );
};

const DecodeRow = ({ currentRow, rowId, currentGuess }) => {
  const pegs = [];
  let pegClass;
  let idVal;
  generatePeg(pegs, pegClass, idVal, currentRow, rowId, currentGuess);
  return <div className="decode-row">{pegs}</div>;
};

export default DecodeRow;
