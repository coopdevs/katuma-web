import React, {Component, PropTypes} from 'react';

export default class GroupSuppliersItem extends Component {
  static propTypes = {
    producer: PropTypes.object,
  }

  render() {
    const { producer } = this.props;

    return (
      <div>
        {`${producer.name}`}
      </div>
    );
  }
}
