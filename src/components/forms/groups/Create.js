import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit } from 'redux-form';

import Input from 'components/Input';
import Button from 'components/Button';

const CREATE_GROUP_FORM = 'createGroup';

const renderField = ({ input, label, placeholder, meta: { touched, error } }) => (
  <div>
    <div>
      <label>{label}</label>
    </div>
    <select {...input} placeholder={placeholder}>
      <option></option>
      <option value="0">Lunes</option>
      <option value="1">Martes</option>
      <option value="2">Miércoles</option>
      <option value="3">Jueves</option>
      <option value="4">Viernes</option>
      <option value="5">Sábado</option>
      <option value="6">Domingo</option>
    </select>
   {touched && error && <span>{error}</span>}
  </div>
);


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

    this.props.stopSubmit(CREATE_GROUP_FORM, errors);
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            component={Input}
            placeholder="Elige un nombre para tu grupo de compra"
            label="Nombre del grupo"
            type="text"
            errorsAlways
            setInitialFocus
          />
        </div>
        <Field
          name="delivery"
          component={renderField}
          label="Día de entrega"
          placeholder="Especifica el día de entrega de la compra"
        />
        <Field
          name="confirmation"
          component={renderField}
          label="Día de confirmación"
          placeholder="Especifica el día de confirmación de la compra"
        />
        <Button
          type="submit"
          primary
          processing={submitting}
        >Crear grupo</Button>
      </form>
    );
  }
}

const reduxFormProps = {
  form: CREATE_GROUP_FORM,
  persistentSubmitErrors: true,
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
