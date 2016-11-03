import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { browserHistory } from 'react-router';

import { asyncConnect } from 'redux-async-connect';

import sprite from '../../helpers/Sprite';
import config from '../../config';
import styles from './styles/index.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
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
    const { user: oldUser } = this.props;
    const { user } = nextProps;

    if (!oldUser && user) {
      browserHistory.push('/groups');
    } else if (oldUser && !user) {
      browserHistory.push('/login');
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
      <div
        className={classNames({
          [styles.rootComponent]: true,
          [styles.rootComponent_centered]: layoutCentered,
        })}
      >
        <Helmet {...head}/>
        {children}
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
  connect(mapStateToProps)
)(App);
