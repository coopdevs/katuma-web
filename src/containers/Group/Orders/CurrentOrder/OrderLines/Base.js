import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import List from './List';

class OrderLinesBase extends Component {
  static propTypes = {
    orderLines: PropTypes.array.isRequired,
  }

  render() {
    const { orderLines } = this.props;

    return (
      <div>
        <List orderLines={orderLines} />
      </div>
    );
  }
}

export default connect()(OrderLinesBase);
