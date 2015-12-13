import React, {Component, PropTypes} from 'react';

export default class GroupsList extends Component {
  static propTypes = {
    groups: PropTypes.object.isRequired,
  }

  render() {
    return (
      <h1>Groups List</h1>
    );
  }
}

