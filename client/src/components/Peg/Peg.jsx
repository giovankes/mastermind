import PropTypes from 'prop-types';
const Peg = ({ pegClass, name, value, idVal, isCurrentRow, activatePeg }) => (
  <span className={pegClass}>
    <input
      type="radio"
      name={name}
      value={value}
      id={idVal}
      onClick={() => (isCurrentRow ? activatePeg() : null)}
    />
    <label htmlFor={idVal} />
  </span>
);

Peg.propTypes = {
  pegClass: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.String,
  idVal: PropTypes.number,
  isCurrentRow: PropTypes.bool,
  activatePeg: PropTypes.func,
};

export default Peg;
