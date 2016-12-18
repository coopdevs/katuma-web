import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';

import { loadEntity } from 'redux/modules/producers/producers';

class GroupProducerBase extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    producer: PropTypes.object.isRequired,
  };

  render() {
    const { children, producer, group } = this.props;

    return (
      React.cloneElement(
        children,
        { group, producer }
      )
    );
  }
}

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { producer_id } }) => {
    return Promise.all([
      dispatch(loadEntity(producer_id)),
    ]);
  }
}];

const mapStateToProps = (state, props) => {
  return {
    producer: state.producersReducer.producers.byId[props.params.producer_id],
  };
};

export default asyncConnect(
  asyncConnectProps,
  mapStateToProps
)(GroupProducerBase);
