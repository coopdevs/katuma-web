import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit } from 'redux-form';

import styles from './styles/index.scss';
import Button from 'components/Button';

const CREATE_GROUP_FORM = 'createGroup';

const renderInputField = ({ input, label, placeholder, meta: { touched, error } }) => (
  <div>
    <div>
      <label>{label}</label>
    </div>
    <input className="form-control" {...input} placeholder={placeholder} />
    {touched && <div className={`text-danger ${styles.error}`}>{error}</div>}
  </div>
);

const renderSelectField = ({ input, label, placeholder, meta: { touched, error } }) => (
  <div>
    <div>
      <label>{label}</label>
    </div>
    <select {...input}>
      <option></option>
      <option value="0">Lunes</option>
      <option value="1">Martes</option>
      <option value="2">Miércoles</option>
      <option value="3">Jueves</option>
      <option value="4">Viernes</option>
      <option value="5">Sábado</option>
      <option value="6">Domingo</option>
    </select>
    {touched && <div className={`text-danger ${styles.error}`}>{error}</div>}
    <div className={`${styles.explanation}`}>{placeholder}</div>
  </div>
);

const required = value => value ? undefined : 'no puede estar en blanco';

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = required(values.name);
  }

  if (!values.delivery) {
    errors.delivery = required(values.delivery);
  }

  if (!values.confirmation) {
    errors.confirmation = required(values.confirmation);
  }

  return errors;
};

class CreateGroupForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object,
    submitting: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="name"
          component={renderInputField}
          placeholder="Elige un nombre para tu grupo de compra"
          label="Nombre del grupo"
        />
        <Field
          name="confirmation"
          component={renderSelectField}
          label="Día de confirmación"
          placeholder="Especifica el día de confirmación de los pedidos"
        />
        <Field
          name="delivery"
          component={renderSelectField}
          label="Día de entrega"
          placeholder="Especifica el día de entrega de los pedidos"
        />
        <Button
          type="submit"
          primary
          disabled={submitting}
        >Crear grupo</Button>
      </form>
    );
  }
}

const reduxFormProps = {
  form: CREATE_GROUP_FORM,
  validate
};

const mapStateToProps = (state) => {
  const { form: allForms, groupsReducer: { errors } } = state;

  const form = allForms[CREATE_GROUP_FORM];

  const newState = { errors };

  if (!form) return newState;

  return { ...newState, submitting: form.submitting };
};

export default compose(
  reduxForm(reduxFormProps),
  connect(mapStateToProps, { stopSubmit })
)(CreateGroupForm);
