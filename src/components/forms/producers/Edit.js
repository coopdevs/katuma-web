import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit } from 'redux-form';

import { edit as editProducer, resetForm as resetProducerForm} from 'redux/modules/producers/producers';

import Fields from './Fields';

export const EDIT_PRODUCER_FORM = 'createProducer';

class EditProducerForm extends Component {
  static propTypes = {
    producer: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
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
    return (<Fields />);
  }
}

/**
 * Edit producer form
 *
 * @param {Object} fields
 * @param {Function} dispatch
 * @param {Object} props
 */
const onSubmit = (fields, dispatch, props) => {
  const { producer } = props;
  return dispatch(editProducer(producer.id, fields));
};

const reduxFormProps = {
  form: EDIT_PRODUCER_FORM,
  persistentSubmitErrors: true,
  onSubmit,
};

const mapStateToProps = ({ producersReducer: { editedProducer, errors } }) =>
  ({ editedProducer, errors });

export default compose(
  reduxForm(reduxFormProps),
  connect(mapStateToProps, { stopSubmit, resetForm: resetProducerForm})
)(EditProducerForm);
