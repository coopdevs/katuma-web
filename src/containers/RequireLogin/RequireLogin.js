import {Component, PropTypes} from 'react';

import loginRequired from '../../decorators/LoginRequired';

const requireLogin = loginRequired(class RequireLogin extends Component {
  static propTypes = {
    user: PropTypes.object,
    history: PropTypes.object.isRequired
  }

  render() {
    return this.props.children;
  }
});

export default requireLogin;
