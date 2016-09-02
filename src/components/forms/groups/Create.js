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
