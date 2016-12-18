import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';
import { edit } from 'redux/modules/products';
import Form, { EDIT_PRODUCT_FORM } from 'components/forms/Product/Edit';

import formStyles from 'components/forms/styles/index.scss';

class EditProductForm extends Component {
  static propTypes = {
    createProduct: PropTypes.func.isRequired,
    producer: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onClickEdit = this._onClickEdit.bind(this);
    this.onSubmitEditProduct = this._onSubmitEditProduct.bind(this);
  }

  /**
   * Submit Create product form
   *
   * @param {Object} fields
   */
  _onSubmitEditProduct(fields) {
    return this.props.createProduct(fields);
  }

  /**
   * Trigger form submit
   */
  _onClickEdit() {
    this._product_form.submit();
  }

  render() {
    const { producer, submitting } = this.props;

    return (
      <div className={formStyles.inlineFormRow}>
        <Form
          ref={(domNode) => this._product_form = domNode}
          onSubmit={this.onSubmitEditProduct}
          producer={producer}
          initialValues={{
            producer_id: producer.id,
            price: producer.price,
            unit: producer.unit,
          }}
        />
        <div>
          <Button
            primary
            processing={!!submitting}
            onClick={this.onClickEdit}
            type="submit"
          >
            Editar
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ form: allForms }) => {
  const form = allForms[EDIT_PRODUCT_FORM];

  if (!form) return {};

  return { submitting: form.submitting };
};

export default connect(
  mapStateToProps,
  { createProduct: edit }
)(EditProductForm);
