import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';

import { load as loadInvitations } from 'redux/modules/invitations/list';
import Invitations from './Invitations';
import List from './List';

@asyncConnect([{
  deferred: true,
  promise: (options) => {
    const {
      store: { dispatch },
      params: { id },
    } = options;

    return dispatch(loadInvitations(id));
  },
}])
export default class GroupMembers extends Component {
  static propTypes = {
    group: PropTypes.object,
    currentUser: PropTypes.object,
    members: PropTypes.array,
  }

  render() {

    const { currentUser, group, members } = this.props;

    return (
      <div>
        <Helmet title={`Miembros de ${group.name}`}/>

        <h2>Miembros</h2>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-sm-push-6 col-md-4 col-md-push-8">
          <Invitations
            group={group}
            currentUser={currentUser}
          />
          </div>

          <div className="col-xs-12 col-sm-6 col-sm-pull-6 col-md-8 col-md-pull-4">
            <List group={group} members={members} />
          </div>

        </div>
      </div>
    );
  }
}
