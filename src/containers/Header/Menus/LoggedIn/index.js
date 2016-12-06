import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import { logout } from 'redux/modules/auth';


import headerStyles from '../../styles/index.scss';
import styles from './styles/index.scss';
const USER_MENU = {
  profile: 'profile',
  logout: 'logout',
};

class LoggedInMenu extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onSelectUserMenu = this._onSelectUserMenu.bind(this);
  }

  /**
   * When user click on a user menu
   *
   * @param {String} key
   */
  _onSelectUserMenu(key) {
    const { logout: doLogout } = this.props;

    switch (key) {
      case USER_MENU.logout:
        doLogout();
        break;
      default:
        break;
    }
  }

  /**
   * Render user link
   */
  renderUserLink() {
    const { user } = this.props;

    return (<span>{user.full_name}</span>);
  }

  render() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <div className={headerStyles.header__menuContent}>
        <ul className={headerStyles.navigationList}>
          <li className={headerStyles.navigationList__navItem}>
            <Link
              to="/discover"
              activeClassName={headerStyles.activeLink}
            >
              Descubrir
          </Link>
          </li>
          <li className={headerStyles.navigationList__navItem}>
            <Link
              to="/groups"
              activeClassName={headerStyles.activeLink}
            >
              Grupos
            </Link>
          </li>
          <li className={headerStyles.navigationList__navItem}>
            <Link
              to="/providers"
              activeClassName={headerStyles.activeLink}
            >
              Proveedores
            </Link>
          </li>
        </ul>
        <div className={styles.userMenu}>
          <DropdownButton
            onSelect={this.onSelectUserMenu}
            id="user_preferences"
            bsStyle="link"
            title={this.renderUserLink()}
            pullRight
          >
            <MenuItem eventKey={USER_MENU.profile}>Tu cuenta</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={USER_MENU.logout}>Salir</MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({user: state.auth.user});
const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInMenu);
