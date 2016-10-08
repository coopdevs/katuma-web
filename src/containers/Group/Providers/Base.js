import React, { Component, PropTypes } from 'react';
import { initialize } from 'redux-form';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import CreateProducerForm from 'components/forms/producers/Create';
import { load as loadProviders } from 'redux/modules/providers/providers';
import { create as createProducer } from 'redux/modules/producers/list';
import { create as createSupplier } from 'redux/modules/suppliers/suppliers';
import List from './List';

const mapStateToProps = (state) => ({
  createProducerErrors: state.producersReducer.createProducerErrors,
  createSupplierErrors: state.suppliersReducer.createSupplierErrors,
  providers: state.providersReducer.providers.entities,
});

const mapDispatchToProps = {
  initialize,
  createProducer,
  createSupplier,
  loadProviders,
};

@asyncConnect([{
  promise: (options) => {
    const {
      store: { dispatch },
      params: { id },
    } = options;

    const promises = [];
    promises.push(dispatch(loadProviders(id)));

    return Promise.all(promises);
  },
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class GroupSuppliersBase extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    providers: PropTypes.array.isRequired,
    loadProviders: PropTypes.func.isRequired,
    createProducer: PropTypes.func.isRequired,
    createSupplier: PropTypes.func.isRequired,
    createProducerErrors: PropTypes.object,
    createSupplierErrors: PropTypes.object,
  }

  handleSubmit(data) {
    const self = this;

    data.group_id = this.props.group.id;

    // First promise: create the producer
    return this.props.createProducer(data).then((responseData) => {
      const errors = self.props.createProducerErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      return Promise.resolve(responseData);
    }).then((producerData) => {
      const supplierData = {
        group_id: data.group_id,
        producer_id: producerData.id,
      };

      // Second promise: create the supplier given the producer ID
      return this.props.createSupplier(supplierData).then(() => {
        const errors = self.props.createSupplierErrors;

        if (Object.keys(errors).length) {
          return Promise.reject(errors);
        }

        return Promise.resolve({});
      }).then(() => {
        // Third promise: load the providers to get latest state
        return this.props.loadProviders(data.group_id).then(() => {

          // TODO: what if the request fails?
          return Promise.resolve({});
        });
      });
    });
  }

  render() {

    const { group, providers } = this.props;

    return (
      <div>
        <Helmet title={`Proveedores de ${group.name}`}/>

        <h2>Proveedores</h2>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-sm-push-6 col-md-4 col-md-push-8">
          </div>

          <div className="col-xs-12 col-sm-6 col-sm-pull-6 col-md-8 col-md-pull-4">
            <List group={group} providers={providers} />
            <CreateProducerForm onSubmit={this.handleSubmit.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
