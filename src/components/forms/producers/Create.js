import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

const CREATE_PRODUCER_FORM_FIELDS = {
  name: {
    type: 'text',
    label: 'Nombre',
    placeholder: 'Elige un nombre para el proveedor'
  },
  email: {
    type: 'textarea',
    label: 'Email',
    placeholder: 'Introduce el email del proveedor'
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
    const field = fields.email;
    const fieldProps = CREATE_PRODUCER_FORM_FIELDS[field.name];
    const { label, type, placeholder } = fieldProps;

    return (
      <div>
        <form onSubmit={handleSubmit}>

          <div className={this.getInputClasses(field)}>
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

          <div className="form-group">
            <button className="btn btn-success" onClick={handleSubmit}>
              {submitting ? 'Enviando...' : 'Enviar invitaciones'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
