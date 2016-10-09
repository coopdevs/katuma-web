import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit } from 'redux-form';

import Input from 'components/Input';
import Button from 'components/Button';

const BULK_INVITATIONS_FORM = 'bulkInvitations';

class BulkInvitationsForm extends Component {
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

    this.props.stopSubmit(BULK_INVITATIONS_FORM, errors);
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="emails"
            component={Input}
            placeholder="Introduce una lista de emails separados por comas. Ej.: ana@gmail.com, hector@hotmail.com, ..."
            label="Emails"
            type="textarea"
            errorsAlways
            setInitialFocus
          />
        </div>
        <Button
          type="submit"
          primary
          processing={submitting}
        >Enviar Invitaciones</Button>
      </form>
    );
  }
}

const reduxFormProps = {
  form: BULK_INVITATIONS_FORM,
  persistentSubmitErrors: true,
};

const mapStateToProps = (state) => {
  const { form: allForms, bulkInvitationsReducer: { errors } } = state;

  const form = allForms[BULK_INVITATIONS_FORM];

  const newState = { errors };

  if (!form) return newState;

  return { ...newState, submitting: form.submitting };
};

export default compose(
  reduxForm(reduxFormProps),
  connect(mapStateToProps, { stopSubmit })
)(BulkInvitationsForm);
