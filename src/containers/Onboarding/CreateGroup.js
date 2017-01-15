import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import layoutCentered from 'components/HOC/LayoutCentered';

import CreateGroupForm from 'components/forms/groups/Create';

import styles from '../../styles/layouts/index.scss';
import { create } from 'redux/modules/groups/groups';
import { create as createOrderFrequency } from 'redux/modules/orders_frequencies/orders_frequencies';

import { getNextOnboardingUrl } from './services';
import weeklyIcalString from 'services/weeklyIcal';

class CreateGroup extends Component {
  static propTypes = {
    createGroup: PropTypes.func.isRequired,
    createOrderFrequency: PropTypes.func.isRequired,
    createdGroupId: PropTypes.number,
    params: PropTypes.object.isRequired
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
    const promise = new Promise((resolve) => {
      resolve(this.props.createGroup(fields));
    });

    promise.then((group) => {
      const orderFrequency = this.orderFrequencyFor(
        group.id,
        fields.delivery,
        'delivery'
      );
      this.props.createOrderFrequency(orderFrequency);

      return group;
    })
    .then((group) => {
      const orderFrequency = this.orderFrequencyFor(
        group.id,
        fields.confirmation,
        'confirmation'
      );
      this.props.createOrderFrequency(orderFrequency);
    })
    .catch(reason => { console.log(reason); });
  }

  orderFrequencyFor(groupId, day, type) {
    return Object.assign({}, { group_id: groupId, }, {
      ical: weeklyIcalString(day),
      frequency_type: type
    });
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
  connect(mapStateToProps, { createGroup: create, createOrderFrequency: createOrderFrequency})
)(CreateGroup);
