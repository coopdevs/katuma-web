import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavBrand, Nav, NavItem, CollapsibleNav } from 'react-bootstrap';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import config from '../../config';

@connect(
    state => ({user: state.auth.user}),
    dispatch => bindActionCreators({logout, pushState}, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState(null, '/groups');
    } else if (this.props.user && !nextProps.user) {
      this.props.pushState(null, '/login');
      // Full real page reload to clean local data
      window.location.reload();
    }
  }

  static fetchData(getState, dispatch) {
    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth());
    }
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <DocumentMeta {...config.app}/>
        <Navbar fixedTop toggleNavKey={0}>
          <NavBrand>
            <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
              <div className={styles.brand}/>
              <span>Katuma</span>
            </IndexLink>
          </NavBrand>

          <CollapsibleNav eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/widgets">
                <NavItem eventKey={2}>Widgets</NavItem>
              </LinkContainer>
              <LinkContainer to="/survey">
                <NavItem eventKey={3}>Survey</NavItem>
              </LinkContainer>
              <LinkContainer to="/groups">
                <NavItem eventKey={4}>Groups</NavItem>
              </LinkContainer>

              {!user &&
              <LinkContainer to="/login">
                <NavItem eventKey={5}>Login</NavItem>
              </LinkContainer>}
              {!user &&
              <LinkContainer to="/signup">
                <NavItem eventKey={5}>Sign Up</NavItem>
              </LinkContainer>}
              {user &&
              <LinkContainer to="/logout">
                <NavItem eventKey={6} className="logout-link" onClick={::this.handleLogout}>
                  Logout
                </NavItem>
              </LinkContainer>}
            </Nav>
            {user &&
            <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.full_name}</strong></p>}
            <Nav navbar right>
              <NavItem eventKey={1} target="_blank" title="View on Github" href="https://github.com/erikras/react-redux-universal-hot-example">
                <i className="fa fa-github"/>
              </NavItem>
            </Nav>
          </CollapsibleNav>
        </Navbar>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
