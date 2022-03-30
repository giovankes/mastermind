import { Component } from 'react';

class Hint extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.state.currentRow - 1 <= nextProps.rowId;
  }
  render() {
    return <span className={this.props.hintClass} />;
  }
}

export default Hint;
