import PropTypes from 'prop-types';

const Peg = ({ name, pegClass, value, idVal, isCurrentRow, activatePeg }) => (
  <span className={pegClass}>
    <input
      type="radio"
      name={name}
      value={value}
      id={idVal}
      onClick={isCurrentRow ? activatePeg : null}
    />
  </span>
);

Peg.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  idVal: PropTypes.number.isRequired,
  isCurrentRow: PropTypes.bool.isRequired,
  activatePeg: PropTypes.bool.isRequired,
  pegClass: PropTypes.string.isRequired,
};

export default Peg;
