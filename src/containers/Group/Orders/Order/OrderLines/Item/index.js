import React, { Component, PropTypes } from 'react';

import { getProductName } from 'presenters/product';
import QuantityEditForm from 'components/forms/order/QuantityEdit';

class Item extends Component {
  static propTypes = {
    orderLine: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(fields) {
    console.log('S U B M I T', fields);
  }

  render() {
    const { orderLine } = this.props;

    return (
      <tr>
        <td>{orderLine.name}</td>
        <td>
          <QuantityEditForm
            initialValues={{quantity: orderLine.quantity}}
            handleSubmit={this.handleSubmit}
          />
        </td>
        <td>{getProductName(orderLine.unit)}</td>
        <td>{orderLine.price}</td>
        <td>{orderLine.total}</td>
      </tr>
    );
  }
}

export default Item;
