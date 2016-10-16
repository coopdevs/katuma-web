import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit } from 'redux-form';

import Input from 'components/Input';
import { create as createProducer, resetCreated as resetCreatedProducer } from 'redux/modules/producers/producers';

export const CREATE_PRODUCER_FORM = 'createProducer';

class CreateProducerForm extends Component {
  static propTypes = {
    onCreated: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    resetCreated: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object,
    createdProducer: PropTypes.object,
  }

  componentWillReceiveProps(newProps) {
    const { resetCreated, onCreated, createdProducer: oldCreatedProducer } = this.props;
    const { errors, createdProducer } = newProps;

    this.checkErrors(errors);

    if ((oldCreatedProducer === createdProducer) || !createdProducer) return;

    resetCreated();
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
      <div>
        <div>
          <Field name="group_id" component={Input} type="hidden" />
          <Field
            name="name"
            component={Input}
            placeholder="Nombre del productor"
            label="Nombre"
            type="text"
            errorsAlways
            setInitialFocus
          />
          <Field
            name="address"
            component={Input}
            placeholder="Direccion del productor. Calle, localidad, provincia,..."
            label="Direccion"
            type="textarea"
            errorsAlways
            rows={5}
          />
        </div>
      </div>
    );
  }
}

/**
 * Create producer form
 *
 * @param {Object} fields
 * @param {Function} dispatch
 */
const onSubmit = (fields, dispatch) => {
  return dispatch(createProducer(fields));
};

const reduxFormProps = {
  form: CREATE_PRODUCER_FORM,
  persistentSubmitErrors: true,
  onSubmit,
};

const mapStateToProps = ({ producersReducer: { createdProducer, errors } }) =>
  ({ createdProducer, errors });

export default compose(
  reduxForm(reduxFormProps),
  connect(mapStateToProps, { stopSubmit, resetCreated: resetCreatedProducer })
)(CreateProducerForm);
