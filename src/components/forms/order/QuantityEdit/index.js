import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import Input from 'components/Input';

class QuantityEditForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field
            name="quantity"
            component={Input}
            type="text"
            ref="quantity"
            errorsAlways
          />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'quantity',
  persistentSubmitErrors: true,
})(QuantityEditForm);
