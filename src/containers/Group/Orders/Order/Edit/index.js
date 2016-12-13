import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import _ from 'underscore';
import moment from 'moment';

import { load as loadSuppliers } from 'redux/modules/suppliers/suppliers';
import { create, edit } from 'redux/modules/order_lines';
import Products from './Products/Base';
import OrderLines from '../OrderLines/Base';

class Edit extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    activeProducts: PropTypes.array,
    order: PropTypes.object,
    orderLines: PropTypes.array,
    grandTotal: PropTypes.number,
    editOrderLine: PropTypes.func,
    createOrderLine: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.onSubmitQuantityChange = this._onSubmitQuantityChange.bind(this);
  }

  _onSubmitQuantityChange() {
    console.log('DALE!');
  }

  render() {
    const { activeProducts, order, orderLines, grandTotal } = this.props;

    return (
      <div className="row">
        <div className="col-xs-8">
          <Products products={activeProducts} onSubmitQuantityChange={this.onSubmitQuantityChange}/>
        </div>
        <div className="col-xs-4">
          Confirmar antes del dia: {moment().utc(order.confirm_before).format('dddd, MMMM Do YYYY')}
          <OrderLines orderLines={orderLines} grandTotal={grandTotal}/>
        </div>
      </div>
    );
  }
}

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id } }) => {
    return Promise.all([
      dispatch(loadSuppliers(id)),
    ]);
  }
}];

const mapStateToProps = (state, props) => {
  const suppliers = state.suppliersReducer.suppliers.byGroupId[props.params.id];
  const activeProducts = state.productsReducer.products.entities.filter((product) => {
    return _.contains(_.pluck(suppliers, 'producer_id'), product.producer_id);
  });

  return {
    activeProducts,
  };
};

export default asyncConnect(
  asyncConnectProps,
  mapStateToProps,
  {
    editOrderLine: edit,
    createOrderLine: create,
  }
)(Edit);
