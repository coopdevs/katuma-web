import _ from 'underscore';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initialize} from 'redux-form';
import DocumentMeta from 'react-document-meta';
import { create } from 'redux/modules/groups/groups';
import CreateGroup from 'components/forms/onboarding/Group';

@connect(
  state => ({
    createGroupErrors: state.groupsReducer.createGroupErrors,
    groups: state.groupsReducer.groups,
  }),
  {initialize, create})
export default class Complete extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    groups: PropTypes.object,
    createGroupErrors: PropTypes.object,
    history: PropTypes.object,
  }

  handleSubmit(data) {
    // I do not know javascript at all
    // Why I need self in an arrow function?
    const self = this;

    return this.props.create(data).then(() => {
      const errors = self.props.createGroupErrors;

      if (Object.keys(errors).length) {
        return Promise.reject(errors);
      }

      // do something on success
      self.props.initialize('onboardingCreateGroup', {});
      const group = _.last(self.props.groups.entities);
      self.props.history.pushState(null, `/onboarding/${group.id}/members`);
      return Promise.resolve({});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <DocumentMeta title="Signup Complete"/>
            <h1>Crea un grupo</h1>

            <CreateGroup onSubmit={::this.handleSubmit}/>
          </div>
        </div>
      </div>
    );
  }
}
