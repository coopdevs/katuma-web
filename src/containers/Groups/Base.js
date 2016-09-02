import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../Header';

@connect(
  state => ({
    groups: state.groupsReducer.groups
  }),
  {})
export default class GroupsBase extends Component {
  static propTypes = {
    groups: PropTypes.object,
    children: PropTypes.object,
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Header />

        <div className="container">
          {children && React.cloneElement(children, {groups: this.props.groups})}
        </div>
      </div>
    );
  }
}
