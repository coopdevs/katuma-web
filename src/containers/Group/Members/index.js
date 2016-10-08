import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';

import { load as loadInvitations } from 'redux/modules/invitations/list';
import Invitations from './Invitations';
import List from './List';

class GroupMembers extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    memberships: PropTypes.array.isRequired,
  }

  render() {
    const { users, user, group, memberships } = this.props;

    return (
      <div>
        <Helmet title={`Miembros de ${group.name}`}/>

        <Link to={`/groups/${group.id}/providers`} style={{float: 'right'}}>Proveedores</Link>
        <h2>Miembros</h2>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-sm-push-6 col-md-4 col-md-push-8">
            <Invitations group={group} user={user} />
          </div>

          <div className="col-xs-12 col-sm-6 col-sm-pull-6 col-md-8 col-md-pull-4">
            <List group={group} users={users} memberships={memberships} />
          </div>

        </div>
      </div>
    );
  }
}

const asyncConnectProps = [{
  deferred: true,
  promise: ({ store: { dispatch }, params: { id } }) => {
    return dispatch(loadInvitations(id));
  },
}];

export default asyncConnect(asyncConnectProps)(GroupMembers);
