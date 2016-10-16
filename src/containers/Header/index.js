import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

import { logout } from 'redux/modules/auth';
import styles from './styles/index.scss';
import Anonymous from './Menus/Anonymous';

class Header extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  constructor() {
    super();

    this.logout = this.handleLogout.bind(this);
  }

  /**
   * Handle logout
   *
   * @param {Event} event
   */
  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
   * Logged menu
   */
  renderLoggedMenu() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <div>
        <Link to="/groups/list">Grupos</Link>
        <strong>{user.full_name}</strong>
        <button onClick={this.logout}>Salir</button>
      </div>
    );
  }

  /**
   * Profile
   */
  renderProfileMenu() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <div>
        <strong>{user.full_name}</strong>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <div className={styles.navigation}>
        <div className="wrap container-fluid">
          <div className="row">
            <IndexLink to="/">Katuma</IndexLink>
            {this.renderLoggedMenu()}
            <Anonymous user={user} />
            {this.renderProfileMenu()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({user: state.auth.user});
const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
