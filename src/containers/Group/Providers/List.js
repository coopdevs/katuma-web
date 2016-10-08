import React, { Component, PropTypes } from 'react';

import Item from './Item';

export default class GroupProvidersList extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    providers: PropTypes.array.isRequired,
  }

  render() {
    const { group, providers } = this.props;

    const providersList = providers.map((provider) => {
      return (
        <li key={provider.id}>
          <Item group={group} provider={provider} />
        </li>
      );
    });

    return (<ul>{providersList}</ul>);
  }
}
