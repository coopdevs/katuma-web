import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class GroupProvidersItem extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    provider: PropTypes.object.isRequired,
  }

  render() {
    const { group, provider } = this.props;

    return (
      <Link to={`/groups/${group.id}/providers/${provider.id}`}>{`${provider.name}`}</Link>
    );
  }
}
