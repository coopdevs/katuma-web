import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';

import Invitations from './Invitations';

const mapStateToProps = () => ({});
const mapDispatchToProps = {};
@connect(mapStateToProps, mapDispatchToProps)
export default class GroupMembers extends Component {
  static propTypes = {
    group: PropTypes.object,
  }

  render() {
    const { group } = this.props;

    return (
      <div>
        <DocumentMeta title={`Miembros de ${group.name}`}/>

        <h2>Miembros</h2>
        <Invitations group={group} />
      </div>
    );
  }
}
