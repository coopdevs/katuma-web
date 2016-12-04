import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import Item from '../Item/';

import { load as loadOrders } from 'redux/modules/orders/orders';
import { load as loadOrdersFrequencies } from 'redux/modules/orders_frequencies/orders_frequencies';

class GroupOrdersList extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
    orders_frequencies: PropTypes.array.isRequired,
  }

  render() {
    const { orders } = this.props;

    if (!orders.length) return (<span>Ningun pedido!</span>);

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Completar</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Item key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.ordersReducer.orders.entities,
    orders_frequencies: state.ordersFrequenciesReducer.orders_frequencies.entities,
  };
};

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id } }) => {
    const promises = [];

    promises.push(dispatch(loadOrders(id, true)));
    promises.push(dispatch(loadOrdersFrequencies(id)));

    return Promise.all(promises);
  },
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps),
)(GroupOrdersList);
