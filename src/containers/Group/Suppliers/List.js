import React, {Component, PropTypes} from 'react';

import Item from './Item';

export default class GroupSuppliersList extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    producers: PropTypes.object.isRequired,
  }

  render() {
    const { producers } = this.props;

    const producerList = producers.map((producer) => {
      return (<li key={producer.id}><Item producer={producer} /></li>);
    });

    return (<ul>{producerList}</ul>);
  }
}
