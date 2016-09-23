import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import { loadEntity as loadProvider } from 'redux/modules/providers/providers';

const mapStateToProps = (state, ownProps) => {
  const providerId = ownProps.params.id;

  return {
    provider: state.providersReducer.providers.byId[providerId],
  };
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
    const id = params.id;
    const provider = byId[id];

    if (!provider) {
      promises.push(dispatch(loadProvider(id)));
    }

    return Promise.all(promises);
  }
}])
@connect(mapStateToProps)
export default class GroupProvidersDetails extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    provider: PropTypes.object.isRequired,
  }

  render() {
    const { group, provider } = this.props;

    return (
      <div>
        <Helmet title={`Proveedor ${provider.name}`}/>

        <h2>{provider.name}</h2>
        <div><strong>email </strong>{provider.email}</div>
        <div><strong>direccion </strong>{provider.address}</div>

        <Link to={`/groups/${group.id}/providers`}>Proveedores</Link>
      </div>
    );
  }
}
