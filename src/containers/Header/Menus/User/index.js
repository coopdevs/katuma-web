import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import { logout } from 'redux/modules/auth';

import styles from './styles/index.scss';

const USER_MENU = {
  profile: 'profile',
  logout: 'logout',
};

class User extends Component {
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

    return (<span className={styles.userMenu__content}>{user.full_name}</span>);
  }

  render() {
    const { user } = this.props;

    if (!user) return null;

    return (
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
    );
  }
}

const mapStateToProps = (state) => ({user: state.auth.user});
const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(User);
