import React, { Component, PropTypes } from 'react';

import List from './List';

class OrderLinesBase extends Component {
  static propTypes = {
    orderLines: PropTypes.array.isRequired,
    grandTotal: PropTypes.number.isRequired,
  }

  render() {
    const { orderLines, grandTotal } = this.props;

    return (
      <div>
        <List orderLines={orderLines} grandTotal={grandTotal} />
      </div>
    );
  }
}

export default OrderLinesBase;
