import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getProductName } from 'presenters/product';
import { edit, create, destroy } from 'redux/modules/order_lines';

import QuantityEditForm from 'components/forms/order/QuantityEdit';

class Item extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    editOrderLine: PropTypes.func.isRequired,
    createOrderLine: PropTypes.func.isRequired,
    destroyOrderLine: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(fields) {
    const { order, editOrderLine, createOrderLine, destroyOrderLine } = this.props;
    const { productId, orderLineId } = fields;
    const quantity = fields[`quantity_${productId}`];

    if (!orderLineId) {
      return createOrderLine({ order_id: order.id, product_id: productId, quantity });
    }

    if (quantity === '0') {
      return destroyOrderLine(orderLineId);
    }

    return editOrderLine(orderLineId, { quantity });
  }

  render() {
    const { product } = this.props;
    const quantityInitialValues = {
      [`quantity_${product.id}`]: product.quantity,
      orderLineId: product.orderline_id,
      productId: product.id,
    };

    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{getProductName(product.unit)}</td>
        <td>
          <QuantityEditForm
            form={`quantity_${product.id}`}
            initialValues={quantityInitialValues}
            productId={product.id}
            orderLineId={product.orderline_id}
            onSubmit={this.handleSubmit}
          />
        </td>
      </tr>
    );
  }
}

export default connect(null, { editOrderLine: edit, createOrderLine: create, destroyOrderLine: destroy })(Item);
