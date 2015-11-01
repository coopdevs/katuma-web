import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({
    memberships: state.membershipsReducer.memberships
  }),
  {})
export default class GroupBase extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {
    return (
      <div className="container">
        <h1>Group Home</h1>
      </div>
    );
  }
}

