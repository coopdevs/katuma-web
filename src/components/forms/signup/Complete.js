import React, {Component, PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';

const COMPLETE_SIGNUP_FORM_FIELDS = {
  username: {
    type: 'text',
    label: 'Nombre de usuario',
    placeholder: 'Elige un nombre de usuario. Ej.: roberto_perez'
  },
  first_name: {
    type: 'text',
    label: 'Nombre',
    placeholder: 'Tu nombre'
  },
  last_name: {
    type: 'text',
    label: 'Apellido',
    placeholder: 'Tu primer apellido'
  },
  password: {
    type: 'password',
    label: 'Contraseña',
    placeholder: 'Elige una contraseña'
  },
  password_confirmation: {
    type: 'password',
    label: 'Confirmacion de Contraseña',
    placeholder: 'Repite la misma contraseña'
  },
  token: {
    type: 'hidden'
  }
};

@connectReduxForm({
  form: 'signupComplete',
  fields: Object.keys(COMPLETE_SIGNUP_FORM_FIELDS)
})
export default class CompleteSignupForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired
  }

  /**
   * Get css classes for field
   *
   * @param {Object} field
   * @param {Sting} type
   */
  getInputClasses(field, type) {
    const classes = [];

    if (type !== 'hidden') {
      classes.push('form-group');
    }

    if (field.error) {
      classes.push('has-error');
    }

    return classes.join(' ');
  }

  render() {
    const {handleSubmit, submitting, fields} = this.props;

    const renderInput = (field, index) => {
      const {label, type, placeholder} = COMPLETE_SIGNUP_FORM_FIELDS[field.name];

      return (
        <div key={index} className={this.getInputClasses(field, type)}>

          {type !== 'hidden' && <label htmlFor={field.name}>{label}</label>}

          <div>
            <input
              id={field.name}
              type={type}
              className="form-control"
              placeholder={placeholder}
              {...field}/>

            {field.error && <div className="text-danger">{field.error}</div>}
          </div>
        </div>
      );
    };

    const inputs = Object.keys(fields).map((key, index) => renderInput(fields[key], index));

    return (
      <div>
        <form onSubmit={handleSubmit}>

          {inputs}

          <div className="form-group">
            <button className="btn btn-success" onClick={handleSubmit}>
              {submitting ? 'Enviando...' : 'Finalizar registro'}
            </button>
          </div>
        </form>

      </div>
    );
  }
}
