import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Item extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  }

  render() {
    const { order } = this.props;

    return (
      <tr>
        <td>{order.confirm_before}</td>
        <td>{order.created_at}</td>
      </tr>
    );
  }
}

export default connect(
)(Item);
