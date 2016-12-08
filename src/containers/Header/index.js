import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import classNames from 'classnames';

import Hamburger from 'components/Hamburger';
import UserMenu from './Menus/User';
import LoggedIn from './Menus/LoggedIn';
import LoggedOut from './Menus/LoggedOut';

import styles from './styles/index.scss';

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    hideSignupButton: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onToggle = this._onToggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  _onToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { user, hideSignupButton } = this.props;
    const { isOpen } = this.state;

    return (
        <nav
          className={classNames({
            'navar navbar-fixed-top': true,
            [styles.header]: !user,
            [styles.header_responsive]: user,
          })}
        >
        <div className="wrap container-fluid">
          <div className={`row ${styles.headerWrapper}`}>
            <div className={styles.logoWrapper}>
              <IndexLink to="/" className={styles.logo}>K</IndexLink>
            </div>

            {user &&
              <div className={styles.hamburger}>
                <Hamburger onToggle={this.onToggle} isOpen={isOpen}/>
              </div>
            }

            <UserMenu />

            <div
              className={classNames({
                [styles.menu]: true,
                [styles.isOpen]: isOpen,
              })}
            >
              <LoggedOut hideSignupButton={hideSignupButton}/>
              <LoggedIn />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({user: state.auth.user});
export default connect(mapStateToProps)(Header);
