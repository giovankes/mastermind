import { Component } from 'react';
import Peg from '../Peg';
class DecodeRow extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.state.currentRow <= nextProps.rowId;
  }
  generatePeg(i) {
    let pegs = [];

    let idVal;
    let pegClass;
    idVal = this.props.name + '-' + i + 1;
    //update current row
    if (this.props.state.currentRow === this.props.rowId) {
      pegClass = this.props.state.currentGuess.get(i)
        ? 'peg ' + this.props.state.currentGuess.get(i)
        : 'peg';
    } else {
      //clear all of the next pegs
      pegClass = 'peg';
    }
    pegs.push(
      <Peg
        state={this.props.state}
        idVal={idVal}
        name={this.props.name}
        value={i + 1}
        key={idVal}
        pegClass={pegClass}
        isCurrentRow={this.props.isCurrentRow}
        activatePeg={this.props.activatePeg}
      />
    );
    return pegs;
  }

  render() {
    console.log(this.generatePeg);
    return;
  }
}
