import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit } from 'redux-form';

import { resetForm as resetProducerForm } from 'redux/modules/producers/producers';

import Fields from './Fields';

export const CREATE_PRODUCER_FORM = 'createProducer';

class CreateProducerForm extends Component {
  static propTypes = {
    onCreated: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object,
    createdProducer: PropTypes.object,
  }

  componentWillReceiveProps(newProps) {
    const { resetForm, onCreated, createdProducer: oldCreatedProducer } = this.props;
    const { errors, createdProducer } = newProps;

    this.checkErrors(errors);

    if ((oldCreatedProducer === createdProducer) || !createdProducer) return;

    resetForm();
    onCreated(createdProducer);
  }

  /**
   * When api request has errors show it
   * on the form.
   *
   * @param {Object} errors.
   */
  checkErrors(errors) {
    if (!errors) return;

    this.props.stopSubmit(CREATE_PRODUCER_FORM, errors);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Fields />
      </form>
    );
  }
}

const mapStateToProps = ({ producersReducer: { createdProducer, errors } }) =>
  ({ createdProducer, errors });

export default compose(
  reduxForm({ form: CREATE_PRODUCER_FORM, persistentSubmitErrors: true }),
  connect(mapStateToProps, { stopSubmit, resetForm: resetProducerForm })
)(CreateProducerForm);
