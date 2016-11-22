import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { Nav, NavItem } from 'react-bootstrap';

import { load as loadOrders } from 'redux/modules/orders/orders';
import { load as loadOrdersFrequencies } from 'redux/modules/orders_frequencies/orders_frequencies';

import NewOrder from './NewOrder/';
import CurrentOrder from './CurrentOrder/';
import List from './List/';

const TABS = {
  current: 'current',
  orders: 'orders',
};

const DEFAULT_TAB = TABS.current;

class GroupOrders extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    orders: PropTypes.array.isRequired,
    orders_frequencies: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleTabChange = this._handleTabChange.bind(this);
    this.state = {
      activeTab: DEFAULT_TAB,
    };
  }

  _handleTabChange(activeTab) {
    this.setState({ activeTab });
  }

  currentOrder() {
    const { orders } = this.props;

    return orders.find((order) => { return order.id > 0; });
  }

  /**
   * Render navigation.
   */
  renderNavigation() {
    const { activeTab } = this.state;

    return (
      <Nav bsClass="nav nav-tabs nav-tabs--centered" activeKey={activeTab} onSelect={this.handleTabChange}>
        <NavItem eventKey={TABS.current}>Pedido activo</NavItem>
        <NavItem eventKey={TABS.orders}>Pedidos</NavItem>
      </Nav>
    );
  }

  /**
   * Render current order
   */
  renderCurrent() {
    const { activeTab } = this.state;

    if (activeTab !== TABS.current) return null;
    if (this.currentOrder()) {
      return (
        <CurrentOrder order={this.currentOrder()} />
      );
    }

    return (<NewOrder group={this.props.group} />);
  }

  /**
   * Render orders list
   */
  renderOrders() {
    const { activeTab } = this.state;
    const { orders } = this.props;

    if (activeTab !== TABS.orders) return null;

    return (
      <List orders={orders} />
    );
  }

  render() {
    const { group } = this.props;

    return (
      <div>
        <Helmet title={`Pedidos para ${group.name}`}/>

        <h3>Pedidos</h3>
        {this.renderNavigation()}
        <div>
          {this.renderCurrent()}
          {this.renderOrders()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.ordersReducer.orders.entities,
    orders_frequencies: state.ordersFrequenciesReducer.orders_frequencies.entities,
    productsById: state.productsReducer.products.byId,
  };
};

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id } }) => {
    const promises = [];

    promises.push(dispatch(loadOrders(id, true)));
    promises.push(dispatch(loadOrdersFrequencies(id)));

    return Promise.all(promises);
  },
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps),
)(GroupOrders);
