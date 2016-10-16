import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import styles from './styles/index.scss';

class Sidebar extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
  };

  render() {
    const { group } = this.props;

    return (
      <ul>
        <li>
          <IndexLink
            to={`/groups/${group.id}`}
            activeClassName={styles.activeLink}
          >
            Miembros
          </IndexLink>
        </li>
        <li>
          <Link
            to={`/groups/${group.id}/producers`}
            activeClassName={styles.activeLink}
          >
            Productores
          </Link>
        </li>
      </ul>
    );
  }
}

export default Sidebar;
