import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit } from 'redux-form';

import { resetForm as resetProducerForm} from 'redux/modules/producers/producers';

import Fields from './Fields';

export const EDIT_PRODUCER_FORM = 'createProducer';

class EditProducerForm extends Component {
  static propTypes = {
    producer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object,
    editedProducer: PropTypes.bool,
  }

  componentWillReceiveProps(newProps) {
    const { resetForm, editedProducer: oldEditedProducer } = this.props;
    const { errors, editedProducer } = newProps;

    this.checkErrors(errors);

    if (oldEditedProducer === editedProducer) return;

    resetForm();
  }

  /**
   * When api request has errors show it
   * on the form.
   *
   * @param {Object} errors.
   */
  checkErrors(errors) {
    if (!errors) return;

    this.props.stopSubmit(EDIT_PRODUCER_FORM, errors);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Fields />
      </form>
    );
  }
}

const mapStateToProps = ({ producersReducer: { editedProducer, errors } }) =>
  ({ editedProducer, errors });

export default compose(
  reduxForm({ form: EDIT_PRODUCER_FORM }),
  connect(mapStateToProps, { stopSubmit, resetForm: resetProducerForm})
)(EditProducerForm);
