import React, {Component, PropTypes} from 'react';

import Item from './Item';

export default class GroupSuppliersList extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    suppliers: PropTypes.array.isRequired,
  }

  render() {
    const { suppliers } = this.props;

    const supplierList = suppliers.map((supplier) => {
      return (<li key={supplier.id}><Item supplier={supplier} /></li>);
    });

    return (<ul>{supplierList}</ul>);
  }
}
