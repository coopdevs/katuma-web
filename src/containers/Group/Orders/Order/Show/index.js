import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import Button from 'components/Button';
import OrderLines from '../OrderLines/Base';

class Show extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    order: PropTypes.object,
    orderLines: PropTypes.array,
    grandTotal: PropTypes.number,
  }

  render() {
    const { params: { id }, order, orderLines, grandTotal } = this.props;

    return (
      <div className="panel panel-default">
        <div>
          Confirmar antes del dia: {moment().utc(order.confirm_before).format('dddd, MMMM Do YYYY')}
          <Button primary linkTo={`/groups/${id}/orders/${order.id}/edit`}>Edit</Button>
        </div>
        <OrderLines orderLines={orderLines} grandTotal={grandTotal}/>
      </div>
    );
  }
}

export default Show;
