import Hint from '../Hint';
const generateHint = ({ i, name, rowId, state }) => {
  const hints = [];
  let idVal;
  let hintClass = '';
  let exactMatches = state.exactMatches;
  let valueMatches = state.valueMatches;
  hintClass = 'hint';
  idVal = name + '-' + i + 1;
  if (state.currentRow - 1 === rowId) {
    if (exactMatches > 0) {
      hintClass = hintClass + ' exact-matches';
      exactMatches--;
    } else if (valueMatches > 0) {
      hintClass = hintClass + ' value-matches';
    } else {
      hintClass = hintClass + ' none-matches';
    }
  }

  hints.push(
    <Hint key={idVal} hintClass={hintClass} rowId={rowId} state={state} />
  );
  return hints;
};
const HintsRow = ({ state, rowId, name }) => {
  const hints = times(state.pegsInRow)(generateHint());
  console.log(hints);
  return;
};

export default HintsRow;
