import React, {Component, PropTypes} from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router';

import { load as loadGroups } from 'redux/modules/groups/groups';
import Header from '../Header';

export default class List extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
  }

  renderGroupList() {
    const { groups } = this.props;

    if (!groups.length) return (<span>No tienes grupos</span>);

    return (
      <ul>
        {groups.map((group) => {
          return (
            <li key={group.id}>
              <Link to={`/groups/${group.id}`}>
                {group.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Groups List</h1>
        {this.renderGroupList()}
      </div>
    );
  }
}

const asyncConnectProps = [{
  promise: ({ store: { dispatch } }) => {
    const promises = [];

    promises.push(dispatch(loadGroups()));

    return Promise.all(promises);
  }
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(state => ({ groups: state.groupsReducer.groups.entities }))
)(List);
