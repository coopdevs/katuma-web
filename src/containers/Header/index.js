import React from 'react';
import { IndexLink } from 'react-router';

import LoggedIn from './Menus/LoggedIn';
import LoggedOut from './Menus/LoggedOut';

import styles from './styles/index.scss';

const Header = () => {
  return (
      <div className={`navbar navbar-fixed-top ${styles.header}`}>
      <div className="wrap container-fluid">
        <div className="row">
          <div className={`col-xs-4 ${styles.header__logoWrapper}`}>
            <IndexLink to="/" className={styles.header__logo}>K</IndexLink>
          </div>
          <div className={`col-xs-8 ${styles.header__menu}`}>
            <LoggedIn />
            <LoggedOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
