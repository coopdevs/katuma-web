/* eslint no-debugger: 0 */
import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
import { checkSignup } from 'redux/modules/signup/complete';

export default class Complete extends Component {
  static propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    token: PropTypes.string
  }

  static onEnter(nextState, replaceState, cb) {
    const token = nextState.params.token;

    console.log('cb', cb);

    function goHome() {
      replaceState(null, '/');
    }

    function continueOrGoHome(response) {
      console.log('response', response);
    }

    if (token) {
      store.dispatch(checkSignup(token)).then(continueOrGoHome);
    } else {
      goHome();
    }
  }

  render() {
    const {token} = this.props.params;

    return (
      <div className="container">
        <DocumentMeta title="Signup Complete"/>
        <h1>Signup Complete</h1>
        <div className="alert" role="alert">
          <p>this is the token {token}</p>
        </div>

      </div>
    );
  }
}
