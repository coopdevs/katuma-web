import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';

import headerStyles from '../../styles/index.scss';

class LoggedOutMenu extends Component {
  static propTypes = {
    user: PropTypes.object,
    hideSignupButton: PropTypes.bool,
  };

  static contextTypes = {
    openLoginDialog: PropTypes.func.isRequired,
    openSignupDialog: PropTypes.func.isRequired,
  };

  render() {
    const { openLoginDialog, openSignupDialog} = this.context;
    const { user, hideSignupButton } = this.props;

    if (user) return null;

    return (
      <nav>
        <ul className={headerStyles.navigationList}>
          <li className={headerStyles.navigationList__button}>
            <Button onClick={openLoginDialog}>Accede a tu cuenta</Button>
          </li>
          {!hideSignupButton &&
            <li className={headerStyles.navigationList__button}>
              <Button primary onClick={openSignupDialog}>Registrate</Button>
            </li>
          }
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({user: state.auth.user});
export default connect(mapStateToProps)(LoggedOutMenu);
