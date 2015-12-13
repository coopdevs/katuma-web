import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';

import Invitations from './Invitations';
import List from './List';

const mapStateToProps = (state) => ({
  users: state.usersReducer.users,
});

const mapDispatchToProps = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class GroupMembers extends Component {
  static propTypes = {
    group: PropTypes.object,
    users: PropTypes.object,
    memberships: PropTypes.object,
  }

  render() {
    const { group, users, memberships } = this.props;

    return (
      <div>
        <DocumentMeta title={`Miembros de ${group.name}`}/>

        <h2>Miembros</h2>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-sm-push-6 col-md-4 col-md-push-8">
            <Invitations group={group} users={users} />
          </div>

          <div className="col-xs-12 col-sm-6 col-sm-pull-6 col-md-8 col-md-pull-4">
            <List group={group} users={users} memberships={memberships} />
          </div>

        </div>
      </div>
    );
  }
}
