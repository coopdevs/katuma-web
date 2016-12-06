import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logout } from 'redux/modules/auth';
import Button from 'components/Button';

import headerStyles from '../../styles/index.scss';

class LoggedInMenu extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

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

  render() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <ul className={headerStyles.navigationList}>
        <li className={headerStyles.navigationList__navItem}>
          <Link
            to="/groups"
            activeClassName={headerStyles.activeLink}
          >
            Grupos
          </Link>
        </li>
        <li>
          <strong>{user.full_name}</strong>
        </li>
        <li className={headerStyles.navigationList__button}>
          <Button onClick={this.logout}>Salir</Button>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({user: state.auth.user});
const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInMenu);
