import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { routeActions } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';

import sprite from '../../helpers/Sprite';
import config from '../../config';
import styles from './styles/index.scss';

@asyncConnect([{
  promise: (options) => {
    const {
      store: { dispatch, getState },
    } = options;
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {push: routeActions.push}
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    user: PropTypes.object,
    push: PropTypes.func.isRequired
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
