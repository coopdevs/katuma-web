import React, { Component, PropTypes } from 'react';

class Base extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    return (React.cloneElement(this.props.children));
  }
}

export default Base;
