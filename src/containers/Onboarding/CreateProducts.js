import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';

import layoutCentered from 'components/HOC/LayoutCentered';
import CreateProductForm from 'containers/Group/Producers/Producer/Products/CreateProductsForm/';
import List from 'containers/Group/Producers/Producer/Products/List/';
import { loadEntity as loadProducer } from 'redux/modules/producers/producers';
import { load as loadProducts } from 'redux/modules/products';
import Button from 'components/Button';

import styles from '../../styles/layouts/index.scss';

import { getNextOnboardingUrl } from './services';

class CreateProducts extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    producer: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
  };

  render() {
    const { products, producer, params} = this.props;

    return (
      <div className={styles.layoutCentered}>
        <div className={styles.layoutCentered__body}>
          <CreateProductForm producer={producer} />
          <List products={products} />

          <Button
            link
            primary
            linkTo={getNextOnboardingUrl('finish', params.id)}
          >
            Finalizar
          </Button>
        </div>
      </div>
    );
  }
}

const asyncConnectProps = [{
  promise: (options) => {
    const { store: { dispatch }, params: { producer_id } } = options;

    const promises = [];

    promises.push(dispatch(loadProducer(producer_id)));
    promises.push(dispatch(loadProducts(producer_id)));

    return Promise.all(promises);
  },
}];

const mapStateToProps = (state, { params: { producer_id } }) => {
  const {
    producersReducer: { producers: { byId } },
    productsReducer: { products: { byProducerId } },
  } = state;

  const producer = byId[producer_id];
  const products = byProducerId[producer.id] || [];

  return { producer, products };
};

export default compose(
  layoutCentered,
  asyncConnect(asyncConnectProps, mapStateToProps),
)(CreateProducts);
