import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

const CREATE_PRODUCT_FORM_FIELDS = {
  name: {
    type: 'text',
    label: 'Nombre',
    placeholder: 'Elige un nombre para el producto',
  },
  unit: {
    type: 'select',
    label: 'Unidad de medida',
    placeholder: 'Introduce la unidad de medida',
  },
  price: {
    type: 'text',
    label: 'Precio',
    placeholder: 'Introduce el precio',
  },
};

@reduxForm({
  form: 'createProduct',
  fields: Object.keys(CREATE_PRODUCT_FORM_FIELDS),
})
export default class CreateProductForm extends Component {
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
      const fieldProps = CREATE_PRODUCT_FORM_FIELDS[field.name];

      if (!fieldProps) {
        return null;
      }

      const { label, type, placeholder } = fieldProps;

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
            {type === 'select' && <select {...inputProps}/>}

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
              {submitting ? 'Enviando...' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
