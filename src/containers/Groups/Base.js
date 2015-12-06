import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import { load as loadGroups } from 'redux/modules/groups/groups';

@connect(
  state => ({
    groups: state.groupsReducer.groups
  }),
  dispatch => bindActionCreators({loadGroups}, dispatch))
export default class GroupsBase extends Component {
  static propTypes = {
    groups: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  }

  static fetchData(getState, dispatch) {
    return dispatch(loadGroups());
  }

  render() {
    return (
      <div className="container">
        {React.cloneElement(this.props.children, {groups: this.props.groups})}
      </div>
    );
  }
}
