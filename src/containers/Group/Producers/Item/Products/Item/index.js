import React, { Component, PropTypes } from 'react';

import { getProductName } from 'presenters/product';

class Item extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  }

  render() {
    const { product } = this.props;

    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{getProductName(product.unit)}</td>
      </tr>
    );
  }
}

export default Item;
