import React, { Component, PropTypes } from 'react';

import Item from './Item';

class CartBase extends Component {
  static propTypes = {
    orderLines: PropTypes.array,
    grandTotal: PropTypes.number.isRequired,
  }

  render() {
    const { orderLines, grandTotal } = this.props;

    return (
      <div>
        <div>
          {orderLines && orderLines.map((orderLine) => <Item key={orderLine.id} orderLine={orderLine} />)}
        </div>
        <div>
          Total {grandTotal}
        </div>
      </div>
    );
  }
}

export default CartBase;
