import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit } from 'redux-form';

import Input from 'components/Input';
import Button from 'components/Button';

const CREATE_GROUP_FORM = 'createGroup';

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
        <div>
          <div>
            <label>Día de entrega</label>
          </div>
          <Field
            name="delivery"
            component="select"
            placeholder="Especifica el dia de entrega de la compra"
          >
            <option></option>
            <option value="0">Lunes</option>
            <option value="1">Martes</option>
            <option value="2">Miércoles</option>
            <option value="3">Jueves</option>
            <option value="4">Viernes</option>
            <option value="5">Sábado</option>
            <option value="6">Domingo</option>
          </Field>
        </div>
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
