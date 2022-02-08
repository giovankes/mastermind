import Hint from '../Hint';

const generateHint = (
  currentRow,
  rowId,
  hints,
  hintClass,
  name,
  valueMatches,
  exactMatches,
  idVal,
  state,
  i,
) => {
  hintClass = 'hint';
  idVal = `${name}-${i + 1}`;
  if (currentRow - 1 === rowId) {
    if (exactMatches > 0) {
      hintClass = `${hintClass} exact-matched`;
      exactMatches--;
    } else if (valueMatches > 0) {
      hintClass = `${hintClass} value-matches`;
      valueMatches--;
    } else {
      hintClass = `${hintClass} none-matches`;
    }
  }
  hints.push(<Hint key={idVal} hintClass={hintClass} rowId={rowId} state={state} />);
};
const HintsRow = ({ exactMatches, valueMatches, rowId, currentRow, name, i, state }) => {
  const hints = [];
  let idVal;
  let hintClass = '';

  generateHint(
    currentRow,
    exactMatches,
    valueMatches,
    rowId,
    hints,
    hintClass,
    state,
    idVal,
    i,
  );
};

export default HintsRow;
