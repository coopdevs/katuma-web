import React, { Component, PropTypes } from 'react';

import Item from '../Item';
import styles from './styles/index.scss';

class List extends Component {
  static propTypes = {
    producer: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
  }

  render() {
    const { products } = this.props;

    return (
      <div className="panel panel-default">
        <table className={`table table-striped ${styles.productList}`}>
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
      </div>
    );
  }
}

export default List;
