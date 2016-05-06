import React, {Component, PropTypes} from 'react';

export default class GroupSuppliersItem extends Component {
  static propTypes = {
    supplier: PropTypes.object,
  }

  render() {
    const { supplier } = this.props;

    return (
      <div>
        {`${supplier.name}`}
      </div>
    );
  }
}
