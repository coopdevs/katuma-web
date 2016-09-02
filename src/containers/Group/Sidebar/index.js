import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './styles/index.scss';

class Sidebar extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
  };

  render() {
    const { group } = this.props;

    return (
      <ul>
        <li><Link to={`/groups/${group.id}/members`} activeClassName={styles.activeLink}>Miembros</Link></li>
        <li><Link to={`/groups/${group.id}/producers`} activeClassName={styles.activeLink}>Productores</Link></li>
      </ul>
    );
  }
}

export default Sidebar;
