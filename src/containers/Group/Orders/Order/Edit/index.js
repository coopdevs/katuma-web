import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import Products from './Products/Base';
import Cart from './Cart/Base';

class Edit extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    order: PropTypes.object,
    orderLines: PropTypes.array,
    grandTotal: PropTypes.number,
  }

  render() {
    const { order, orderLines, grandTotal } = this.props;
    const groupId = this.props.params.id;

    return (
      <div className="row">
        <div className="col-xs-8">
          <Products
            groupId={groupId}
            order={order}
          />
        </div>
        <div className="col-xs-4">
          Confirmar antes del dia: {moment().utc(order.confirm_before).format('dddd, MMMM Do YYYY')}
          <Cart orderLines={orderLines} grandTotal={grandTotal}/>
        </div>
      </div>
    );
  }
}

export default Edit;
