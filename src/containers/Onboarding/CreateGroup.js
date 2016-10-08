import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import layoutCentered from 'components/HOC/LayoutCentered';

import CreateGroupForm from 'components/forms/groups/Create';

import styles from '../../styles/layouts/index.scss';
import { create } from 'redux/modules/groups/groups';

class CreateGroup extends Component {
  static propTypes = {
    createGroup: PropTypes.func.isRequired,
    createdGroupId: PropTypes.number,
    params: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { createdGroupId: oldCreatedGroupId, push } = this.props;
    const { createdGroupId } = newProps;

    if (oldCreatedGroupId === createdGroupId) return;

    push(`/groups/${createdGroupId}/members`);
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
  connect(mapStateToProps, { createGroup: create, push: routeActions.push })
)(CreateGroup);
