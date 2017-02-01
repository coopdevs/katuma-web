import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import Item from './Item';
import styles from './styles/index.scss';
import { create, edit } from 'redux/modules/order_lines';

class ProductsBase extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    order: PropTypes.object.isRequired,
    activeProducts: PropTypes.array.isRequired,
    suppliers: PropTypes.array.isRequired,
  }

  render() {
    const { activeProducts, order } = this.props;

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
          {activeProducts.map((product) => <Item key={product.id} product={product} order={order}/>)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state, props) => {
  const activeProducts = state.productsReducer.products.entities.filter((product) => {
    return _.contains(_.pluck(suppliers, 'producer_id'), product.producer_id);
  });
  const orderLinesByProductId = _.indexBy(props.orderLines, 'product_id');

  return {
    activeProducts: _.map(activeProducts, (product) => {
      const orderLine = orderLinesByProductId[product.id];

      return {
        ...product,
        quantity: orderLine && orderLine.quantity || 0,
        orderline_id: orderLine && orderLine.id,
      };
    }),
  };
};

export default connect(
  mapStateToProps,
  {
    editOrderLine: edit,
    createOrderLine: create,
  }
)(ProductsBase);
