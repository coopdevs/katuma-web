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

    const index = {
      confirmation: 0,
      delivery: 1
    };

    promise.then((group) => {
      const orderFrequency = {
        group_id: group.id,
        ical: this.buildIcal(fields),
        frequency_type: index.delivery
      };

      this.props.createOrderFrequency(orderFrequency);
    })
    .catch((reason) => {
      console.log(reason);
    });
  }

  buildIcal(fields) {
    const days = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA, RRule.SU];
    const rule = new RRule.RRule({
      freq: RRule.WEEKLY,
      interval: 1,
      byweekday: days[fields.delivery],
      dtstart: new Date()
    });

    return rule.toString();
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
