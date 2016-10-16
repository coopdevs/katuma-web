import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import { load as loadSuppliers } from 'redux/modules/suppliers/suppliers';
import { load as loadProducers } from 'redux/modules/producers/producers';

class Base extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    producers: PropTypes.array.isRequired,
  }

  render() {
    const { user, group, producers, children } = this.props;

    return (React.cloneElement(children, { user, group, producers }));
  }
}

const mapStateToProps = () => ({ producersReducer: { producers: { entities: producers } } }) =>
  ({ producers });

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id } }) => {
    const promises = [];

    promises.push(dispatch(loadProducers(id)));
    promises.push(dispatch(loadSuppliers(id)));

    return Promise.all(promises);
  },
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps)
)(Base);
