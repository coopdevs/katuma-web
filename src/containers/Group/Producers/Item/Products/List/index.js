import React, { Component, PropTypes } from 'react';

import Item from '../Item';
import styles from './styles/index.scss';

class List extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
  }

  render() {
    const { products } = this.props;

    if (!products.length) return null;

    return (
      <table className={styles.productList}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Unidades</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => <Item key={product.id} product={product} />)}
        </tbody>
      </table>
    );
  }
}

export default List;
