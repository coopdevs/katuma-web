import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import Input from 'components/Input';

class QuantityEditForm extends Component {
  static propTypes = {
    productId: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    orderLineId: PropTypes.number,
  }

  render() {
    const { productId } = this.props;

    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field
            name={`quantity_${productId}`}
            component={Input}
            type="text"
            ref={`quantity_${productId}`}
            size="1"
            errorsAlways
          />
        </form>
      </div>
    );
  }
}

export default reduxForm({})(QuantityEditForm);
