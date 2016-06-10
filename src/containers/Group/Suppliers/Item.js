import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class GroupSuppliersItem extends Component {
  static propTypes = {
    supplier: PropTypes.object.isRequired,
  }

  render() {
    const { supplier } = this.props;

    return (
      <Link to={`/groups/${supplier.group_id}/suppliers/${supplier.producer_id}`}>{`${supplier.name}`}</Link>
    );
  }
}
