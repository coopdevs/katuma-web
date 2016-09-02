import React, { Component, PropTypes } from 'react';

import { MODAL_TYPES } from './constants';
import Button from 'components/Button';
import UserAccessModal from './UserAccessModal';

class Anonymous extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);


    this.openLogin = this._openLogin.bind(this);
    this.openSignup = this._openSignup.bind(this);
    this.onCloseModal = this._onCloseModal.bind(this);

    this.state = {
      showModal: false,
      modalType: ''
    };
  }

  /**
   * Open modal with login form
   */
  _openLogin() {
    this.setState({
      showModal: true,
      modalType: MODAL_TYPES.login,
    });
  }

  /**
   * Open modal with signup form
   */
  _openSignup() {
    this.setState({
      showModal: true,
      modalType: MODAL_TYPES.signup,
    });
  }

  /**
   * Open modal with signup form
   */
  _onCloseModal() {
    this.setState({
      showModal: false,
      modalType: '',
    });
  }

  render() {
    const { showModal, modalType } = this.state;
    const { user } = this.props;

    if (user) return null;

    return (
      <ul>
        <li>
          <Button linkLookAndFeel onClick={this.openLogin}>Grupos</Button>
        </li>
        <li>
          <Button onClick={this.openLogin}>Entrar</Button>
        </li>
        <li>
          <Button primary onClick={this.openSignup}>Registrate</Button>
        </li>
        <UserAccessModal
          showModal={showModal}
          modalType={modalType}
          onCloseModal={this.onCloseModal}
        />
      </ul>
    );
  }
}

export default Anonymous;
