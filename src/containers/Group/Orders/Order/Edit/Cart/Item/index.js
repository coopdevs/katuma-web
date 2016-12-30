import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getProductName } from 'presenters/product';
import { edit, destroy } from 'redux/modules/order_lines';

import QuantityEditForm from 'components/forms/order/QuantityEdit';
import Button from 'components/Button';
import Icon from 'components/Icon/';
import { GLYPHS } from 'components/Icon/glyphs';

import styles from './styles/index.scss';

class Item extends Component {
  static propTypes = {
    orderLine: PropTypes.object.isRequired,
    editOrderLine: PropTypes.func.isRequired,
    destroyOrderLine: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
    this.handleDestroy = this._handleDestroy.bind(this);
  }

  _handleSubmit(fields) {
    const { orderLine, editOrderLine } = this.props;
    const quantity = fields[`quantity_${orderLine.product_id}`];

    return editOrderLine(orderLine.id, { quantity });
  }

  _handleDestroy() {
    const { orderLine, destroyOrderLine } = this.props;

    return destroyOrderLine(orderLine.id);
  }

  render() {
    const { orderLine } = this.props;

    return (
      <div className={styles.cartItem}>
        <div>
          <ul className="list-unstyled">
            <li>{orderLine.name}</li>
            <li>{orderLine.price} / {getProductName(orderLine.unit)}</li>
          </ul>
        </div>
        <div>
          <QuantityEditForm
            form={`quantity_${orderLine.product_id}`}
            initialValues={{quantity: orderLine.quantity}}
            productId={orderLine.product_id}
            orderLineId={orderLine.id}
            onSubmit={this.handleSubmit}
          />
        </div>
        <div className={styles.cartButton}>
          <Button onClick={this.handleDestroy} size="xs">
            <Icon glyph={GLYPHS.check}/>
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { editOrderLine: edit, destroyOrderLine: destroy })(Item);
