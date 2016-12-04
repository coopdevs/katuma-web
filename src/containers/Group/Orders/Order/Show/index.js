import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import OrderLines from '../OrderLines/Base';

class Show extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    order: PropTypes.object,
    orderLines: PropTypes.array,
    grandTotal: PropTypes.number,
  }

  render() {
    const { order, orderLines, grandTotal } = this.props;

    return (
      <div className="panel panel-default">
        <div>
          Confirmar antes del dia: {moment().utc(order.confirm_before).format('dddd, MMMM Do YYYY')}
        </div>
        <OrderLines orderLines={orderLines} grandTotal={grandTotal}/>
      </div>
    );
  }
}

export default Show;
