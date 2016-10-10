import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import { loadEntity as loadProducer } from 'redux/modules/producers/producers';

const mapStateToProps = (state, ownProps) => {
  const producerId = ownProps.params.producer_id;

  return {
    producer: state.producersReducer.producers.byId[producerId],
  };
};

@asyncConnect([{
  promise: (options) => {

    const {
      store: { dispatch, getState },
      params,
    } = options;

    const {
      producersReducer: { producers: { byId } }
    } = getState();
    const promises = [];
    const id = params.producer_id;
    const producer = byId[id];

    if (!producer) {
      promises.push(dispatch(loadProducer(id)));
    }

    return Promise.all(promises);
  }
}])
@connect(mapStateToProps)
export default class GroupSuppliersDetails extends Component {
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
