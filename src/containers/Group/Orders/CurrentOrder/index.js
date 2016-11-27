import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { load } from 'redux/modules/products/';
import { load as load2 } from 'redux/modules/order_lines';

import { getOrderLines, getGrandTotal } from './selectors';
import OrderLines from './OrderLines/Base';

class CurrentOrder extends Component {
  static propTypes = {
    loadProducts: PropTypes.func.isRequired,
    loadOrderLines: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    orderLines: PropTypes.array.isRequired,
    grandTotal: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { order, loadOrderLines, loadProducts } = this.props;

    loadProducts({ group_id: order.to_group_id });
    loadOrderLines(order.id);
  }

  render() {
    const { orderLines, grandTotal } = this.props;

    return (
      <div>
        <OrderLines orderLines={orderLines} grandTotal={grandTotal} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    orderLines: getOrderLines(state, props),
    grandTotal: getGrandTotal(state, props),
  };
};

export default connect(
  mapStateToProps,
  {
    loadProducts: load,
    loadOrderLines: load2,
  }
)(CurrentOrder);
