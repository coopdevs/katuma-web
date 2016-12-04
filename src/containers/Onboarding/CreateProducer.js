import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { asyncConnect } from 'redux-connect';

import layoutCentered from 'components/HOC/LayoutCentered';
import { create as createProducer } from 'redux/modules/producers/producers';
import CreateProducerForm, { CREATE_PRODUCER_FORM } from 'components/forms/producers/Create';
import { loadGroup } from 'redux/modules/groups/groups';
import { create } from 'redux/modules/suppliers/suppliers';
import Button from 'components/Button';

import styles from '../../styles/layouts/index.scss';

import { getNextOnboardingUrl } from './services';

class CreateProducer extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    createSupplier: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    createdGroupId: PropTypes.number,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onClickCreate = this._onClickCreate.bind(this);
    this.onSubmitCreateProducer = this._onSubmitCreateProducer.bind(this);
    this.onProducerCreated = this._onProducerCreated.bind(this);
  }

  /**
   * Trigger form submit
   */
  _onClickCreate() {
    this._producer_form.submit();
  }

  /**
   * Submit edit producer form
   *
   * @param {Object} fields
   */
  _onSubmitCreateProducer(fields) {
    return this.props.create(fields);
  }

  /**
   * When a new producer is created whe
   * create a new supplier relation on DB.
   * NOTE: On this onboarding step we don't wait
   * for supplier to be created. We go to next step
   *
   * @param {Object} producer
   */
  _onProducerCreated(producer) {
    const { createSupplier, group } = this.props;

    createSupplier({ group_id: group.id, producer_id: producer.id });
    browserHistory.push(getNextOnboardingUrl('create_products', group.id, producer.id));
  }

  render() {
    const { submitting, group } = this.props;

    return (
      <div className={styles.layoutCentered}>
        <div className={styles.layoutCentered__body}>
          <CreateProducerForm
            ref={(domNode) => this._producer_form = domNode}
            onSubmit={this.onSubmitCreateProducer}
            onCreated={this.onProducerCreated}
            initialValues={{ group_id: group.id }}
          />
          <Button
            primary
            processing={!!submitting}
            onClick={this.onClickCreate}
            type="submit"
          >
            Crear
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
  const { groupsReducer: { groups }, form: allForms } = state;
  const form = allForms[CREATE_PRODUCER_FORM];
  const { params: { id } } = ownProps;
  const newState = {
    group: groups.byId[id],
  };

  if (!form) return newState;

  return { ...newState, submitting: form.submitting };
};

export default compose(
  layoutCentered,
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps, { create: createProducer, createSupplier: create })
)(CreateProducer);
