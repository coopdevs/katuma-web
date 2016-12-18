import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router';

import { Breadcrumb, BreadcrumbItem } from 'components/Breadcrumb';
import CreateProductForm from './CreateProductsForm';
import List from './List';

import { load as loadProducts } from 'redux/modules/products';

class ProducerProductsBase extends Component {
  static propTypes = {
    producer: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
  }

  render() {
    const { products, group, producer } = this.props;
    const urlBase = `/groups/${group.id}/producers`;

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><Link to={urlBase}>Productores</Link></BreadcrumbItem>
          <BreadcrumbItem>{producer.name}</BreadcrumbItem>
        </Breadcrumb>
        <CreateProductForm producer={producer} />
        <List products={products} producer={producer} />
      </div>
    );
  }
}

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { producer_id } }) => {
    return Promise.all([
      dispatch(loadProducts({ producer_id })),
    ]);
  }
}];

const mapStateToProps = (state, props) => {
  const products = state.productsReducer.products.byProducerId[props.producer.id] || [];

  return { products };
};

export default asyncConnect(
  asyncConnectProps,
  mapStateToProps
)(ProducerProductsBase);
