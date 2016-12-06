import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import classNames from 'classnames';

import Hamburger from 'components/Hamburger';
import UserMenu from './Menus/User';
import LoggedIn from './Menus/LoggedIn';
import LoggedOut from './Menus/LoggedOut';

import styles from './styles/index.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.onToggle = this._onToggle.bind(this);
    this.state = { isOpen: false };
  }

  _onToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <nav className={`navbar navbar-fixed-top ${styles.header}`}>
        <div className="wrap container-fluid">
          <div className={`row ${styles.header__wrapper}`}>
            <div className={styles.header__logoWrapper}>
              <IndexLink to="/" className={styles.header__logo}>K</IndexLink>
            </div>

            <div className={styles.hamburger}>
              <Hamburger onToggle={this.onToggle} isOpen={isOpen}/>
            </div>

            <UserMenu />

            <div
              className={classNames({
                [styles.header__menu]: true,
                [styles.isOpen]: isOpen,
              })}
            >
              <LoggedIn />
              <LoggedOut />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
