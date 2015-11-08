import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import BulkInvitationsForm from 'components/forms/invitations/Bulk';
import {send} from 'redux/modules/invitations/bulk';

const mapStateToProps = (state) => ({
  bulkErrors: state.bulkInvitationsReducer.bulkErrors,
});
const mapDispatchToProps = {send};

@connect(mapStateToProps, mapDispatchToProps)
export default class OnboardingMembers extends Component {
  static propTypes = {
    params: PropTypes.object,
    send: PropTypes.func.isRequired,
    bulkErrors: PropTypes.object,
    history: PropTypes.object,
  }

  handleSubmit(data) {
    const dataWithGroupId = {
      ...data,
      group_id: this.props.params.id
    };

    return this.props.send(dataWithGroupId).then(() => {
      const errors = this.props.bulkErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      this.props.history.pushState(null, `/groups/${this.props.params.id}/members`);
      return Promise.resolve({});
    });
  }

  render() {
    return (
      <div className="container">
          <DocumentMeta title="Invite your friends"/>
          <h1>Onboarding members</h1>
          <BulkInvitationsForm
            onSubmit={this.handleSubmit.bind(this)}
          />
      </div>
    );
  }
}

