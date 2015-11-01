import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

const CREATE_GROUP_FORM_FIELDS = {
  name: {
    type: 'text',
    label: 'Nombre del grupo',
    placeholder: 'Elige un nombre para el grupo'
  },
};

@reduxForm({
  form: 'onboardingCreateGroup',
  fields: Object.keys(CREATE_GROUP_FORM_FIELDS)
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
   */
  getInputClasses(field) {
    const classes = ['form-group'];

    if (field.error) {
      classes.push('has-error');
    }

    return classes.join(' ');
  }

  render() {
    const {handleSubmit, submitting, fields} = this.props;

    const renderInput = (field, index) => {
      const fieldProps = CREATE_GROUP_FORM_FIELDS[field.name];

      if (!fieldProps) {
        return null;
      }

      const {label, type, placeholder} = fieldProps;

      return (
        <div key={index} className={this.getInputClasses(field)}>

          <label htmlFor={field.name}>{label}</label>

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
              {submitting ? 'Enviando...' : 'Crear grupo'}
            </button>
          </div>
        </form>

      </div>
    );
  }
}
