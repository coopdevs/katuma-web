import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { routeActions } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';

import sprite from '../../helpers/Sprite';
import config from '../../config';
import styles from './styles/index.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (__SERVER__) return;

    sprite.element = sprite.render(document.body);
  }

  componentWillReceiveProps(nextProps) {
    const { push, user: oldUser } = this.props;
    const { user } = nextProps;

    if (!oldUser && user) {
      push('/groups');
    } else if (oldUser && !user) {
      push('/login');
    }
  }

  componentWillUnmount() {
    sprite.element.parentNode.removeChild(sprite.element);
  }

  render() {
    const { children } = this.props;
    const { app: { head } } = config;
    const layoutCentered = children && children.type && !!children.type.layoutCentered;

    return (
      <div className={styles.app}>
        <Helmet {...head}/>

        <div
          className={classNames({
            [styles.rootComponent]: true,
            [styles.rootComponent_centered]: layoutCentered,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
}

const asyncConnectProps = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}];
const mapStateToProps = (state) => ({ user: state.auth.user });

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps, { push: routeActions.push })
)(App);
