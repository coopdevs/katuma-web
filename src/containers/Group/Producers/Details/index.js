import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import { loadEntity as loadProducer } from 'redux/modules/producers/producers';

class GroupProducersDetails extends Component {
  static propTypes = {
    producer: PropTypes.object.isRequired,
  }

  render() {
    const { producer } = this.props;

    return (
      <div>
        <Helmet title={`Proveedor ${producer.name}`}/>

        <h2>{producer.name}</h2>
        <div><strong>email </strong>{producer.email}</div>
        <div><strong>direccion </strong>{producer.address}</div>
      </div>
    );
  }
}

const mapStateToProps = (_state, { params: { producer_id } }) =>
  ({ producersReducer: reducer }) => ({ producer: reducer.producers.byId[producer_id] });

const asyncConnectProps = [{
  promise: ({ store: { dispatch, getState }, params: { producer_id} }) => {
    const { producersReducer: { producers: { byId } } } = getState();
    const producer = byId[producer_id];
    const promises = [];

    if (!producer) {
      promises.push(dispatch(loadProducer(producer_id)));
    }

    return Promise.all(promises);
  }
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps)
)(GroupProducersDetails);
