import React, { Component, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import styles from './styles/index.scss';

const TABS = {
  members: 'members',
  producers: 'producers',
  orders: 'orders',
};

class Navigation extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
  };

  render() {
    const { group } = this.props;
    return (
      <div className={styles.groupNavigation}>
        <Nav
          bsClass="nav nav-tabs nav-tabs--centered"
          onSelect={this.handleTabChange}
        >
          <IndexLinkContainer to={`/groups/${group.id}`}>
            <NavItem eventKey={TABS.members}>Miembros</NavItem>
          </IndexLinkContainer>
          <LinkContainer to={`/groups/${group.id}/producers`}>
            <NavItem eventKey={TABS.producers}>Productores</NavItem>
          </LinkContainer>
          <LinkContainer to={`/groups/${group.id}/orders`}>
            <NavItem eventKey={TABS.orders}>Pedidos</NavItem>
          </LinkContainer>
        </Nav>
      </div>
    );
  }
}

export default Navigation;
