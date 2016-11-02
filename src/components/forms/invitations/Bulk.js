import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit, reset } from 'redux-form';

import Input from 'components/Input';
import MessagePane from 'components/MessagePane';
import { BULK } from 'redux/modules/invitations/bulk';

export const BULK_INVITATIONS_FORM = 'bulkInvitations';

class BulkInvitationsForm extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    errors: PropTypes.object,
    invitationsSent: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.onDissmis = this._onDissmis.bind(this);
    this.state = { invitationsSent: false };
  }

  componentWillReceiveProps(newProps) {
    const { resetForm, invitationsSent: oldInvitationsSent } = this.props;
    const { errors, invitationsSent } = newProps;

    this.checkErrors(errors);

    if (oldInvitationsSent === invitationsSent) return;

    resetForm(BULK_INVITATIONS_FORM);
    this.setState({ invitationsSent });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({ type: BULK });
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
    const { invitationsSent } = this.state;

    return (
      <div>
        <MessagePane isVisible={invitationsSent} onDissmis={this.onDissmis}>
          <h4>Invitaciones enviadas</h4>
          <p>Hemos enviado las invitaciones a los emails que has introducido</p>
        </MessagePane>

        <form onSubmit={this.props.handleSubmit}>
          <Field
            name="emails"
            component={Input}
            placeholder="Introduce una lista de emails separados por comas. Ej.: ana@gmail.com, hector@hotmail.com, ..."
            label="Emails"
            type="textarea"
            errorsAlways
            setInitialFocus
            rows={5}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { bulkInvitationsReducer: { invitationsSent, errors } } = state;

  return { invitationsSent, errors };
};

export default compose(
  reduxForm({ form: BULK_INVITATIONS_FORM }),
  connect(mapStateToProps, { stopSubmit, resetForm: reset })
)(BulkInvitationsForm);
