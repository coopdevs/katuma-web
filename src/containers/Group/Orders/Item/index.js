import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Item extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  }

  render() {
    const { order } = this.props;

    return (
      <tr>
        <td>{moment().utc(order.confirm_before).format('dddd, MMMM Do YYYY')}</td>
        <td>{moment().utc(order.created_at).format('dddd, MMMM Do YYYY')}</td>
      </tr>
    );
  }
}

export default connect(
)(Item);
