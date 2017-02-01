import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';

import { loadEntity } from 'redux/modules/orders/orders';

class OrderBase extends Component {
  static propTypes = {
    order_id: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
  }

  render() {
    const { children, order } = this.props;

    return (
      React.cloneElement(
        children,
        { order }
      )
    );
  }
}

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { order_id }}) => {
    return Promise.all([
      dispatch(loadEntity(order_id)),
    ]);
  }
}];

const mapStateToProps = (state, props) => {
  return {
    order: state.ordersReducer.orders.byId[props.order_id],
  };
};

export default asyncConnect(
  asyncConnectProps,
  mapStateToProps
)(OrderBase);
