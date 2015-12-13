import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import BulkInvitationsForm from 'components/forms/invitations/Bulk';
import {send} from 'redux/modules/invitations/bulk';

const mapStateToProps = (state) => ({
  bulkErrors: state.bulkInvitationsReducer.bulkErrors,
});

const mapDispatchToProps = { initialize, send };

@connect(mapStateToProps, mapDispatchToProps)
export default class GroupMembersInvitations extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    group: PropTypes.object,
    send: PropTypes.func.isRequired,
    bulkErrors: PropTypes.object,
  }

  sendInvitations(data) {
    const self = this;
    const dataWithGroupId = {
      ...data,
      group_id: this.props.group.id
    };

    return this.props.send(dataWithGroupId).then(() => {
      const errors = this.props.bulkErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      self.props.initialize('bulkInvitations', {emails: ''});
      return Promise.resolve({});
    });
  }

  render() {
    return (
      <div>
        <h3>Invitaciones</h3>
        <BulkInvitationsForm
        onSubmit={::this.sendInvitations}
        />
      </div>
    );
  }
}
