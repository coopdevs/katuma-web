import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit, reset } from 'redux-form';

import { reset as resetErrors } from 'redux/modules/products';
import Fields from './Fields';
export const EDIT_PRODUCT_FORM = 'editProduct';

class CreateProductForm extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    producer: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    resetFormErrors: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    submitErrors: PropTypes.array,
    errors: PropTypes.object,
  }

  componentWillReceiveProps(newProps) {
    const { resetForm, products } = this.props;
    const { errors, products: newProducts } = newProps;

    this.checkErrors(errors);

    if (products.length === newProducts.length) return;

    resetForm(EDIT_PRODUCT_FORM);
  }

  componentWillUnmount() {
    this.props.resetFormErrors();
  }

  /**
   * When api request has errors show it
   * on the form.
   *
   * @param {Object} errors.
   */
  checkErrors(errors) {
    const { submitErrors } = this.props;

    if (!errors || _.isEqual(errors, submitErrors)) return;

    this.props.stopSubmit(EDIT_PRODUCT_FORM, errors);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Fields />
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { form: allForms, productsReducer: { errors, products } } = state;
  const { producer } = ownProps;
  const productsOfProducer = products.byProducerId[producer.id] || [];
  const form = allForms[EDIT_PRODUCT_FORM];

  const newData = {
    errors,
    products: productsOfProducer,
  };


  if (!form) return newData;

  return {
    ...newData,
    submitErrors: form.submitErrors,
  };
};

export default compose(
  reduxForm({ form: EDIT_PRODUCT_FORM, persistentSubmitErrors: true }),
  connect(
    mapStateToProps,
    { stopSubmit, resetForm: reset, resetFormErrors: resetErrors }
  )
)(CreateProductForm);
