import React, { Component, PropTypes } from 'react';

import Item from './Item';

export default class GroupProducersList extends Component {
  static propTypes = {
    producers: PropTypes.array.isRequired,
    group: PropTypes.object.isRequired,
  }

  render() {
    const { producers, group } = this.props;

    return (
      <ul>
        {producers.map((producer) => {
          return (
            <li key={producer.id}>
              <Item producer={producer} group={group} />
            </li>
          );
        })}
      </ul>
    );
  }
}
