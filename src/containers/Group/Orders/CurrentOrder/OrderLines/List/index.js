import React, { Component, PropTypes } from 'react';

import Item from '../Item';
import styles from './styles/index.scss';

class List extends Component {
  static propTypes = {
    orderLines: PropTypes.array.isRequired,
  }

  render() {
    const { orderLines } = this.props;

    if (!orderLines.length) return null;

    return (
      <table className={styles.productList}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Unidades</th>
          </tr>
        </thead>
        <tbody>
          {orderLines.map((orderLine) => <Item key={orderLine.id} orderLine={orderLine} />)}
        </tbody>
      </table>
    );
  }
}

export default List;
