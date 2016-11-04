import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { create } from 'redux/modules/orders/orders';
import Button from 'components/Button';

class NewOrder extends Component {
  static propTypes = {
    createOrder: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.onClickCreate = this._onClickCreate.bind(this);
  }

  /**
   * Creates a new order to the group
   *
   * TODO: change new Date with next order occurrence
   */
  _onClickCreate() {
    this.props.createOrder({
      to_group_id: this.props.group.id,
      confirm_before: new Date,
    });
  }

  render() {
    return (
      <div>
        <p>
          Todavia no has creado tu pedido para la semana que viene!
        </p>
        <Button
          primary
          onClick={this.onClickCreate}
          type="submit"
        >
          Crear
        </Button>
      </div>
    );
  }
}

export default connect(null, { createOrder: create })(NewOrder);
