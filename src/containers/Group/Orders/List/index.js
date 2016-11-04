import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Item from '../Item/';

class List extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  }

  render() {
    const { orders } = this.props;

    if (!orders.length) return (<span>Ningun pedido!</span>);

    return (
      <table>
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

export default connect(
)(List);
