import React, { Component, PropTypes } from 'react';

import Item from './Item';

export default class GroupSuppliersList extends Component {
  static propTypes = {
    suppliers: PropTypes.object.isRequired,
  }

  render() {
    const { suppliers } = this.props;

    const suppliersList = suppliers.entities.map((supplier) => {
      return (<li key={supplier.id}><Item supplier={supplier} /></li>);
    });

    return (<ul>{suppliersList}</ul>);
  }
}
