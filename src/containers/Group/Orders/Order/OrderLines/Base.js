import React, { Component, PropTypes } from 'react';

import List from './List';

class OrderLinesBase extends Component {
  static propTypes = {
    orderLines: PropTypes.array.isRequired,
  }

  render() {
    console.log('PINTATE');
    const { orderLines } = this.props;

    return (
      <div>
        <List orderLines={orderLines} />
      </div>
    );
  }
}

export default OrderLinesBase;
