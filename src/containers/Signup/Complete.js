import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import DocumentMeta from 'react-document-meta';
import * as signupCompleteActions from 'redux/modules/signup/complete';
import CompleteSignupForm from 'components/forms/signup/Complete';

@connect(
  state => ({
    validSignup: state.signupCompleteReducer.validSignup
  }),
  {initialize})
export default class Complete extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    params: PropTypes.object,
    validSignup: PropTypes.bool,
    token: PropTypes.string
  }

  componentWillMount() {
    this.props.initialize('signupComplete', {
      token: this.props.params.token
    });
  }

  static onEnter(nextState, replaceState, cb) {
    const context = this.context;
    const token = nextState.params.token;

    function goSignup() {
      replaceState(null, '/signup');
    }

    function signupOrCreate() {
      const {signupCompleteReducer: {validSignup}} = context.getState();

      if (!validSignup) {
        goSignup();
      }

      cb();
    }

    if (token) {
      context.dispatch(signupCompleteActions.checkSignup(token))
        .then(signupOrCreate);
    } else {
      goSignup();
      cb();
    }
  }

  handleSubmit(data) {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('survey', {});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <DocumentMeta title="Signup Complete"/>
            <h1>Finaliza el registro</h1>

            <CompleteSignupForm onSubmit={::this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }
}
