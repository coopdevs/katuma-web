import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import moment from 'moment';

import { load as loadOrderLines } from 'redux/modules/order_lines';
import { getOrderLines } from '../selectors';

import Button from 'components/Button';
import OrderLines from '../OrderLines/Base';

class Show extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    order: PropTypes.object,
    orderLines: PropTypes.array.isRequired,
  }

  render() {
    const { params: { id }, order, orderLines } = this.props;

    return (
      <div className="panel panel-default">
        <div>
          Confirmar antes del dia: {moment().utc(order.confirm_before).format('dddd, MMMM Do YYYY')}
          <Button primary linkTo={`/groups/${id}/orders/${order.id}/edit`}>Edit</Button>
        </div>
        <OrderLines orderLines={orderLines} />
      </div>
    );
  }
}

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { order_id } }) => {
    return dispatch(loadOrderLines(order_id));
  }
}];

const mapStateToProps = (state, props) => {
  return {
    orderLines: getOrderLines(state, props),
  };
};

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps)
)(Show);
