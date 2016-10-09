import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit, reset } from 'redux-form';

import Input from 'components/Input';
import Button from 'components/Button';
import MessagePane from 'components/MessagePane';

const BULK_INVITATIONS_FORM = 'bulkInvitations';

class BulkInvitationsForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    errors: PropTypes.object,
    submitting: PropTypes.bool,
    invitationsSent: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.onDissmis = this._onDissmis.bind(this);
    this.state = { invitationsSent: false };
  }

  componentWillReceiveProps(newProps) {
    const { resetForm, invitationsSent: oldInvitationsSent } = this.props;
    const { invitationsSent, errors } = newProps;

    this.checkErrors(errors);

    if (oldInvitationsSent === invitationsSent) return;

    resetForm(BULK_INVITATIONS_FORM);
    this.setState({ invitationsSent });
  }

  _onDissmis() {
    this.setState({ invitationsSent: false });
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
    const { invitationsSent } = this.state;

    return (
      <form onSubmit={handleSubmit}>

        <MessagePane isVisible={invitationsSent} onDissmis={this.onDissmis}>
          <h4>Invitaciones enviadas</h4>
          <p>Hemos enviado las invitaciones a los emails que has introducido</p>
        </MessagePane>

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
  const { form: allForms, bulkInvitationsReducer: { invitationsSent, errors } } = state;

  const form = allForms[BULK_INVITATIONS_FORM];

  const newState = { invitationsSent, errors };

  if (!form) return newState;

  return { ...newState, submitting: form.submitting };
};

export default compose(
  reduxForm(reduxFormProps),
  connect(mapStateToProps, { stopSubmit, resetForm: reset })
)(BulkInvitationsForm);
