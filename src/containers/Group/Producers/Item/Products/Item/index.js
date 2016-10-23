import React, { Component, PropTypes } from 'react';


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
        <td>{product.unit}</td>
      </tr>
    );
  }
}

export default Item;
