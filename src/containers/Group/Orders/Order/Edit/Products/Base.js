import React, { Component, PropTypes } from 'react';

import Item from './Item';
import styles from './styles/index.scss';

class ProductsBase extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    order: PropTypes.object.isRequired,
  }

  render() {
    const { products, order } = this.props;

    return (
      <table className={styles.productList}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Unidad</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => <Item key={product.id} product={product} order={order}/>)}
        </tbody>
      </table>
    );
  }
}

export default ProductsBase;
