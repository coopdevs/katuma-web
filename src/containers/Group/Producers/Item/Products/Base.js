import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CreateProductForm from './CreateProductsForm';
import List from './List';

import { load } from 'redux/modules/products';

class ProducerProductsBase extends Component {
  static propTypes = {
    loadProducts: PropTypes.func.isRequired,
    producer: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { producer, loadProducts } = this.props;

    loadProducts({ producer_id: producer.id });
  }

  render() {
    const { products, producer } = this.props;

    return (
      <div>
        <CreateProductForm producer={producer} />
        <List products={products} />
      </div>
    );
  }
}

const mapStateToProps = (_state, { producer }) => {
  return (state) => {
    const { productsReducer: { products: { byProducerId } } } = state;
    const products = byProducerId[producer.id] || [];

    return { products };
  };
};

export default connect(mapStateToProps, { loadProducts: load })(ProducerProductsBase);
