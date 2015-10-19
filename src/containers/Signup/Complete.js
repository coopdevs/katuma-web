import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';

export default class Signup extends Component {
  static propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    token: PropTypes.string
  }

  static onEnter(nextState, replaceState) {
    // Go home if no token present
    if (!nextState.params.token) {
      replaceState(null, '/');
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
