import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { asyncConnect } from 'redux-async-connect';

import layoutCentered from 'components/HOC/LayoutCentered';
import Button from 'components/Button';

import { send } from 'redux/modules/invitations/bulk';
import BulkInvitationsForm, { BULK_INVITATIONS_FORM }from 'components/forms/invitations/Bulk';

import { getNextOnboardingUrl } from './services';
import styles from '../../styles/layouts/index.scss';
import { loadGroup } from 'redux/modules/groups/groups';

class Invitations extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    sendBulk: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    invitationsSent: PropTypes.bool,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onSubmitSendBulk = this._onSubmitSendBulk.bind(this);
    this.onClickSendInvitations = this._onClickSendInvitations.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { invitationsSent: oldInvitationsSent, group } = this.props;
    const { invitationsSent } = newProps;

    if (oldInvitationsSent === invitationsSent) return;

    browserHistory.push(getNextOnboardingUrl('create_producer', group.id));
  }

  /**
   * Send bulk invitations
   */
  _onClickSendInvitations() {
    this.refs.bulk_invitations_form.submit();
  }

  /**
   * Send bulk invitations
   *
   * @param {Object} fields
   */
  _onSubmitSendBulk(fields) {
    const { group: { id }, sendBulk } = this.props;
    const data = {...fields, group_id: id };

    return sendBulk(data);
  }

  render() {
    const { submitting, group } = this.props;

    return (
      <div className={styles.layoutCentered}>
        <div className={styles.layoutCentered__body}>
          <BulkInvitationsForm
            group={group}
            ref="bulk_invitations_form"
            onSubmit={this.onSubmitSendBulk}
          />
          <Button
            link
            linkTo={getNextOnboardingUrl('create_producer', group.id)}
          >
            Saltar paso
          </Button>
          <Button
            type="submit"
            primary
            processing={submitting}
            onClick={this.onClickSendInvitations}
          >
            Enviar Invitaciones
          </Button>
        </div>
      </div>
    );
  }
}

const asyncConnectProps = [{
  promise: (options) => {
    const { store: { dispatch }, params: { id } } = options;
    return dispatch(loadGroup(id));
  },
}];

const mapStateToProps = (state, ownProps) => {
  const {
    form: allForms,
    groupsReducer: { groups },
    bulkInvitationsReducer: { invitationsSent },
  } = state;
  const { params: { id } } = ownProps;

  const newState = {
    group: groups.byId[id],
    invitationsSent,
  };

  const form = allForms[BULK_INVITATIONS_FORM];

  if (!form) return newState;

  return {
    ...newState,
    submitting: form.submitting,
  };
};

export default compose(
  layoutCentered,
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps, { sendBulk: send })
)(Invitations);
