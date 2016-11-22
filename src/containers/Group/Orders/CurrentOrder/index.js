import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { load as loadProducts } from 'redux/modules/products/';
import { load as loadOrderLines } from 'redux/modules/order_lines';

import OrderLines from './OrderLines/Base';

class CurrentOrder extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    orderLines: PropTypes.array.isRequired,
  }

  render() {
    const { orderLines } = this.props;
    console.log(orderLines);

    return (
      <div>
        <OrderLines orderLines={orderLines} />
      </div>
    );
  }
}

const mapStateToProps = (_state, { order }) => {
  return (state) => {
    const { orderLinesReducer: { orderLines: { byOrderId } } } = state;
    const { productsReducer: { products: { byId } } } = state;
    const orderLines = byOrderId[order.id] || [];

    return {
      orderLines: orderLines.map((orderLine) => {
        return {
          ...byId[orderLine.product_id],
          ...orderLine,
        };
      }),
    };
  };
};

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id } }) => {
    const promises = [];

    promises.push(dispatch(loadProducts({ group_id: id })));
    promises.push(dispatch(loadOrderLines(this.props.order.id)));

    return Promise.all(promises);
  },
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps),
)(CurrentOrder);
