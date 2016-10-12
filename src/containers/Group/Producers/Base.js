import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import { load as loadSuppliers } from 'redux/modules/suppliers/suppliers';
import { load as loadProducers } from 'redux/modules/producers/producers';
import { providers } from 'presenters/providers';

import List from './List';

class GroupProducersBase extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

    // Props from `connect`
    producers: PropTypes.array.isRequired,
  }

  render() {
    const { group, producers } = this.props;

    return (
      <div>
        <Helmet title={`Proveedores de ${group.name}`}/>

        <h3>Productores</h3>

        <div>
          <List group={group} producers={producers} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return (state) => {
    const { producersReducer, suppliersReducer } = state;
    const producers = producersReducer.producers.entities;
    const suppliers = suppliersReducer.suppliers.byProducerId;

    return {
      producers: providers(producers, suppliers),
    };
  };
};

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id } }) => {
    const promises = [];
    promises.push(dispatch(loadSuppliers(id)));
    promises.push(dispatch(loadProducers(id)));

    return Promise.all(promises);
  },
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps)
)(GroupProducersBase);
