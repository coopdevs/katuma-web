import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';

import Invitations from './Invitations';
import List from './List';

export default class GroupMembers extends Component {
  static propTypes = {
    group: PropTypes.object,
    currentUser: PropTypes.object,
    members: PropTypes.array,
    invitations: PropTypes.object,
  }

  render() {

    const { currentUser, group, members, invitations } = this.props;

    return (
      <div>
        <DocumentMeta title={`Miembros de ${group.name}`}/>

        <h2>Miembros</h2>

        <div className="row">

          <div className="col-xs-12 col-sm-6 col-sm-push-6 col-md-4 col-md-push-8">
          <Invitations
            group={group}
            invitations={invitations}
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
