import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import headerStyles from '../../styles/index.scss';

class LoggedInMenu extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <div className={headerStyles.header__menuContent}>
        <ul className={headerStyles.navigationList}>
          <li className={headerStyles.navItem}>
            <Link
              to="/discover"
              activeClassName={headerStyles.activeLink}
            >
              Descubrir
          </Link>
          </li>
          <li className={headerStyles.navItem}>
            <Link
              to="/groups"
              activeClassName={headerStyles.activeLink}
            >
              Grupos
            </Link>
          </li>
          <li className={headerStyles.navItem}>
            <Link
              to="/providers"
              activeClassName={headerStyles.activeLink}
            >
              Proveedores
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({user: state.auth.user});
export default connect(mapStateToProps)(LoggedInMenu);
