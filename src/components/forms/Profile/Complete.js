import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit } from 'redux-form';

import Input from 'components/Input';
import Button from 'components/Button';

const SIGNUP_COMPLETE_FORM = 'signupComplete';

class ProfileCompleteForm extends Component {
  static propTypes = {
    reducerKey: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object,
    submitting: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps({ errors }) {
    this.checkErrors(errors);
  }

  /**
   * When api request has errors show it
   * on the form.
   *
   * @param {Object} errors.
   */
  checkErrors(errors) {
    if (!errors) return;

    this.props.stopSubmit(SIGNUP_COMPLETE_FORM, errors);
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="username"
            component={Input}
            placeholder="Introduce tu nombre de usuario"
            label="Nombre de usuario"
            type="text"
            errorsAlways
            setInitialFocus
          />

          <Field
            name="first_name"
            component={Input}
            placeholder="Introduce tu nombre"
            label="Nombre"
            type="text"
            errorsAlways
          />

          <Field
            name="last_name"
            component={Input}
            placeholder="Introduce tu apellido"
            label="Apellido(s)"
            type="text"
            errorsAlways
          />

          <Field
            name="password"
            component={Input}
            placeholder="Elige un contraseña"
            label="Contraseña"
            type="password"
            errorsAlways
          />

          <Field
            name="password_confirmation"
            component={Input}
            placeholder="Repite la misma contraseña"
            label="Confirmacion de contraseña"
            type="password"
            errorsAlways
          />
        </div>
        <Button
          type="submit"
          primary
          processing={submitting}
        >Finaliza el registro</Button>
      </form>
    );
  }
}

const reduxFormProps = {
  form: SIGNUP_COMPLETE_FORM,
  persistentSubmitErrors: true,
};

const mapStateToProps = (state, { reducerKey }) => {
  const { form: allForms } = state;
  const { errors } = state[reducerKey];
  const newState = { errors };
  const form = allForms[SIGNUP_COMPLETE_FORM];

  if (!form) return newState;
  return { ...newState, submitting: form.submitting };
};

export default compose(
  reduxForm(reduxFormProps),
  connect(mapStateToProps, { stopSubmit })
)(ProfileCompleteForm);
