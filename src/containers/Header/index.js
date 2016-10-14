import React from 'react';
import { IndexLink } from 'react-router';

import LoggedIn from './Menus/LoggedIn';
import LoggedOut from './Menus/LoggedOut';

import styles from './styles/index.scss';

const Header = () => {
  return (
    <div className={styles.navigation}>
      <div className="wrap container-fluid">
        <div className="row">
          <div className="col-xs-6">
            <IndexLink to="/" className={styles.navigation__logo}>K</IndexLink>
          </div>
          <div className="col-xs-6">
            <LoggedIn />
            <LoggedOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
