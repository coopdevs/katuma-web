import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';

import { loadEntity } from 'redux/modules/orders/orders';
import { load as loadProducts } from 'redux/modules/products/';
import { load as loadOrderLines } from 'redux/modules/order_lines';
import { getOrderLines, getGrandTotal } from './selectors';

class OrderBase extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    orderLines: PropTypes.array.isRequired,
    grandTotal: PropTypes.number.isRequired,
  }

  render() {
    const { children, order, orderLines, grandTotal } = this.props;

    return (
      React.cloneElement(
        children,
        { order, orderLines, grandTotal }
      )
    );
  }
}

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id, order_id } }) => {
    return Promise.all([
      dispatch(loadEntity(order_id)),
      dispatch(loadOrderLines(order_id)),
      dispatch(loadProducts({ group_id: id })),
    ]);
  }
}];

const mapStateToProps = (state, props) => {
  return {
    order: state.ordersReducer.orders.byId[props.params.order_id],
    orderLines: getOrderLines(state, props),
    grandTotal: getGrandTotal(state, props),
  };
};

export default asyncConnect(
  asyncConnectProps,
  mapStateToProps
)(OrderBase);
