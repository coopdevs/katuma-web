import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import { asyncConnect } from 'redux-connect';

import { load as loadGroups } from 'redux/modules/groups/groups';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { MODAL_TYPES } from 'components/dialogs/constants';
import UserAccessDialog from 'components/dialogs/UserAccess';
import sprite from '../../helpers/Sprite';
import config from '../../config';
import styles from './styles/index.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    openLoginDialog: PropTypes.func.isRequired,
    openSignupDialog: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onCloseModal = this._onCloseModal.bind(this);
    this.openLoginDialog = this._openLoginDialog.bind(this);
    this.openSignupDialog = this._openSignupDialog.bind(this);

    this.state = {
      showModal: false,
      modalType: ''
    };
  }

  getChildContext() {
    return {
      openLoginDialog: this.openLoginDialog,
      openSignupDialog: this.openSignupDialog,
    };
  }

  componentWillMount() {
    if (__SERVER__) return;

    sprite.element = sprite.render(document.body);
  }

  componentWillReceiveProps(nextProps) {
    const { user: oldUser } = this.props;
    const { user } = nextProps;

    if (!oldUser && user) {
      browserHistory.push('/groups');
      this.onCloseModal();
    } else if (oldUser && !user) {
      browserHistory.push('/login');
      this.onCloseModal();
    }
  }

  componentWillUnmount() {
    sprite.element.parentNode.removeChild(sprite.element);
  }

  /**
   * Open modal with login form.
   */
  _openLoginDialog() {
    this.setState({
      showModal: true,
      modalType: MODAL_TYPES.login,
    });
  }

  /**
   * Open modal with signup form
   */
  _openSignupDialog() {
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
    const { children } = this.props;
    const { app: { head } } = config;
    const layoutCentered = children && children.type && !!children.type.layoutCentered;

    return (
      <div
        className={classNames({
          [styles.rootComponent]: true,
          [styles.rootComponent__centered]: layoutCentered,
        })}
      >
        <Helmet {...head}/>
        {children}
        <UserAccessDialog
          showModal={showModal}
          modalType={modalType}
          onCloseModal={this.onCloseModal}
        />
      </div>
    );
  }
}

const asyncConnectProps = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    const state = getState();

    if (!isAuthLoaded(state)) {
      promises.push(dispatch(loadAuth()));
    }

    if (state.auth.user) {
      promises.push(dispatch(loadGroups()));
    }

    return Promise.all(promises);
  }
}];
const mapStateToProps = (state) => ({ user: state.auth.user });

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps)
)(App);
