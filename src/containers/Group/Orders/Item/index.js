import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

class Item extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
  }

  render() {
    const { order } = this.props;

    return (
      <tr>
        <td>
          <Link to={`/groups/${order.to_group_id}/orders/${order.id}`}>
            {moment().utc(order.confirm_before).format('dddd, MMMM Do YYYY')}
          </Link>
        </td>
        <td>{moment().utc(order.created_at).format('dddd, MMMM Do YYYY')}</td>
      </tr>
    );
  }
}

export default connect(
)(Item);
