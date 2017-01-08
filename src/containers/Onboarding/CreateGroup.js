import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { RRule } from 'rrule-alt';

import layoutCentered from 'components/HOC/LayoutCentered';

import CreateGroupForm from 'components/forms/groups/Create';

import styles from '../../styles/layouts/index.scss';
import { create } from 'redux/modules/groups/groups';
import { create as createOrderFrequency } from 'redux/modules/orders_frequencies/orders_frequencies';

import { getNextOnboardingUrl } from './services';

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
      return new Promise((resolve) => {
        this.orderFrequencyFor(group, fields, 'delivery');
        resolve(group);
      });
    })
    .then((group) => {
      this.orderFrequencyFor(group, fields, 'confirmation');
    })
    .catch((reason) => {
      console.log(reason);
    });
  }

  orderFrequencyFor(group, fields, type) {
    const index = {
      confirmation: 0,
      delivery: 1
    };
    const orderFrequencyData = { group_id: group.id };

    if (type === 'delivery') {
      Object.assign(orderFrequencyData, orderFrequencyData, {
        ical: this.weeklyIcalString(fields.delivery),
        frequency_type: index.delivery
      });
    } else {
      Object.assign(orderFrequencyData, orderFrequencyData, {
        ical: this.weeklyIcalString(fields.confirmation),
        frequency_type: index.confirmation
      });
    }

    this.props.createOrderFrequency(orderFrequencyData);
  }

  weeklyIcalString(index) {
    const days = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];
    const rule = new RRule.RRule({
      freq: RRule.WEEKLY,
      byweekday: days[index]
    });

    return 'RRULE:' + rule.toString();
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
