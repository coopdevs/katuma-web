import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

const CREATE_PRODUCER_FORM_FIELDS = {
  name: {
    type: 'text',
    label: 'Nombre',
    placeholder: 'Elige un nombre para el proveedor'
  },
  email: {
    type: 'text',
    label: 'Email',
    placeholder: 'Introduce el email del proveedor'
  },
  address: {
    type: 'textarea',
    label: 'Direccion',
    placeholder: 'Introduce la direccion del proveedor'
  },
};

@reduxForm({
  form: 'createProducer',
  fields: Object.keys(CREATE_PRODUCER_FORM_FIELDS)
})
export default class CreateProducerForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
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
    const {submitting, fields, handleSubmit} = this.props;

    const renderInput = (field, index) => {
      const fieldProps = CREATE_PRODUCER_FORM_FIELDS[field.name];

      if (!fieldProps) {
        return null;
      }

      const {label, type, placeholder} = fieldProps;

      const inputProps = {
        id: field.name,
        type,
        className: 'form-control',
        placeholder,
        ...field,
      };

      return (
        <div key={index} className={this.getInputClasses(field)}>
          <label htmlFor={field.name}>{label}</label>
          <div>
            {type === 'text' && <input {...inputProps}/>}
            {type === 'textarea' && <textarea rows={5} {...inputProps}/>}

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
              {submitting ? 'Enviando...' : 'Crear proveedor'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
