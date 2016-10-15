import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, stopSubmit, reset } from 'redux-form';

import Input from 'components/Input';
import { create as createProducer } from 'redux/modules/producers/producers';

export const CREATE_PRODUCER_FORM = 'createProducer';

class CreateProducerForm extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    errors: PropTypes.object,
    createdDone: PropTypes.bool,
  }

  componentWillReceiveProps(newProps) {
    const { resetForm, createdDone: oldCreatedDone } = this.props;
    const { errors, createdDone } = newProps;

    this.checkErrors(errors);

    if (oldCreatedDone === createdDone) return;

    resetForm(CREATE_PRODUCER_FORM);
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
            name="email"
            component={Input}
            placeholder="Email del productor"
            label="Email"
            type="text"
            errorsAlways
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

const mapStateToProps = ({ producersReducer: { createdDone, errors } }) =>
  ({ createdDone, errors });

export default compose(
  reduxForm(reduxFormProps),
  connect(mapStateToProps, { stopSubmit, resetForm: reset })
)(CreateProducerForm);
