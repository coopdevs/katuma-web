import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import layoutCentered from 'components/HOC/LayoutCentered';

import CreateGroupForm from 'components/forms/groups/Create';

import styles from '../../styles/layouts/index.scss';
import { create } from 'redux/modules/groups/groups';

import { getNextOnboardingUrl } from './services';

class CreateGroup extends Component {
  static propTypes = {
    createGroup: PropTypes.func.isRequired,
    createdGroupId: PropTypes.number,
    params: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { createdGroupId: oldCreatedGroupId } = this.props;
    const { createdGroupId } = newProps;

    if (oldCreatedGroupId === createdGroupId) return;

    browserHistory.push(getNextOnboardingUrl('send_invitations', createdGroupId));
  }

  /**
  * Submit signup create form
  *
  * @param {Object} fields
  */
  _handleSubmit(fields) {
    return this.props.createGroup(fields);
  }

  render() {
    return (
      <div className={styles.layoutCentered}>
        <div className={styles.layoutCentered__body}>
          <CreateGroupForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ groupsReducer: { createdGroupId }}) => ({ createdGroupId });

export default compose(
  layoutCentered,
  connect(mapStateToProps, { createGroup: create })
)(CreateGroup);
