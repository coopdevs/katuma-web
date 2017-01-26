import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';
import { create } from 'redux/modules/products';
import Form, { CREATE_PRODUCT_FORM } from 'components/forms/Product/Create';

import formStyles from 'components/forms/styles/index.scss';

class CreateProductForm extends Component {
  static propTypes = {
    createProduct: PropTypes.func.isRequired,
    producer: PropTypes.object.isRequired,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onClickCreate = this._onClickCreate.bind(this);
    this.onSubmitCreateProduct = this._onSubmitCreateProduct.bind(this);
  }

  /**
   * Submit Create product form
   *
   * @param {Object} fields
   */
  _onSubmitCreateProduct(fields) {
    return this.props.createProduct(fields);
  }

  /**
   * Trigger form submit
   */
  _onClickCreate() {
    this._product_form.submit();
  }

  render() {
    const { producer, submitting } = this.props;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">Crear producto</div>
        <div className={`panel-body ${formStyles.inlineFormRow}`}>
          <Form
            ref={(domNode) => this._product_form = domNode}
            onSubmit={this.onSubmitCreateProduct}
            producer={producer}
            initialValues={{
              producer_id: producer.id,
              price: 0,
            }}
          />
          <div>
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
      </div>
    );
  }
}

const mapStateToProps = ({ form: allForms }) => {
  const form = allForms[CREATE_PRODUCT_FORM];

  if (!form) return {};

  return { submitting: form.submitting };
};

export default connect(mapStateToProps, { createProduct: create })(CreateProductForm);
