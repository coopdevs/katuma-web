import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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

export default connect((state) => ({
  groups: state.groupsReducer.groups.entities,
}))(List);
