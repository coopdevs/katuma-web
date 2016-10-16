import React, { Component, PropTypes } from 'react';

class Base extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    user: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
  }

  render() {
    const { user, group, children } = this.props;

    return (React.cloneElement(children, { user, group }));
  }
}

export default Base;
