import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router';
import classNames from 'classnames';

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
          <BreadcrumbItem isActive>{producer.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="row">
          <div className={classNames({
            'col-xs-12': true,
            'col-sm-6': !products.length,
            'col-sm-4': !!products.length
          })}>
            <h3>Crear Producto</h3>
            <CreateProductForm producer={producer} />
          </div>
          {!!products.length &&
            <div className="col-xs-12 col-sm-8 first-sm">
              <h3>Lista de productos</h3>
              <List products={products} producer={producer} />
            </div>
          }
        </div>
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
