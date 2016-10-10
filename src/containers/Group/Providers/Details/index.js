import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { initialize } from 'redux-form';

import CreateProductForm from 'components/forms/products/Create';
import { loadEntity as loadProducer } from 'redux/modules/producers/list';
import { create as createProduct } from 'redux/modules/products/products';

const mapStateToProps = (state, ownProps) => {
  const providerId = ownProps.params.provider_id;

  return {
    provider: state.providersReducer.providers.byId[providerId],
    createProductErrors: state.productsReducer.createProductErrors,
  };
};

const mapDispatchToProps = {
  initialize,
  createProduct,
};

@asyncConnect([{
  promise: (options) => {

    const {
      store: { dispatch, getState },
      params,
    } = options;

    const {
      providersReducer: { providers: { byId } }
    } = getState();
    const promises = [];
    const id = params.provider_id;
    const provider = byId[id];

    if (!provider) {
      promises.push(dispatch(loadProducer(id)));
    }

    return Promise.all(promises);
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class GroupProvidersDetails extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    provider: PropTypes.object.isRequired,
    createProduct: PropTypes.func.isRequired,
    createProductErrors: PropTypes.object,
  }

  handleSubmit(data) {
    const self = this;

    data.producer_id = this.props.provider.id;

    // First promise: create the product
    return this.props.createProduct(data).then(() => {
      const errors = self.props.createProductErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      return Promise.resolve({});
    });
  }

  render() {
    const { group, provider } = this.props;

    return (
      <div>
        <Helmet title={`Proveedor ${provider.name}`}/>

        <h2>{provider.name}</h2>
        <div><strong>email </strong>{provider.email}</div>
        <div><strong>direccion </strong>{provider.address}</div>

        <CreateProductForm onSubmit={this.handleSubmit.bind(this)} />

        <Link to={`/groups/${group.id}/providers`}>Proveedores</Link>
      </div>
    );
  }
}
