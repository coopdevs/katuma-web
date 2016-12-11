import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, IndexLink } from 'react-router';
import classNames from 'classnames';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import UserMenu from './Menus/User';
import LoggedOut from './Menus/LoggedOut';

import styles from './styles/index.scss';

function getName(group, showSelector) {
  const name = group ? group.name : null;

  if (showSelector) return name ? name : 'Tus grupos';

  return name ? name : 'Katuma';
}

const renderNameContent = (group, showSelector) => {
  const name = getName(group, showSelector);

  return (
    <span className={styles.dropDownMenu__content}>
      <span to="/" className={styles.logo}>K</span>
      {name &&
        <span className={styles.groupName}>{name}</span>
      }
    </span>
  );
};

const renderName = (group, showSelector) => {
  if (showSelector) {
    return (<span>{renderNameContent(group, showSelector)}</span>);
  }

  return (<IndexLink to="/">{renderNameContent(group, showSelector)}</IndexLink>);
};

class Header extends Component {
  static displayName = 'Header';
  static propTypes = {
    user: PropTypes.object,
    groups: PropTypes.array,
    currentGroup: PropTypes.object,
    hideSignupButton: PropTypes.bool,
    hideLoginButton: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onToggle = this._onToggle.bind(this);
    this.onSelectGroup = this._onSelectGroup.bind(this);
    this.state = {
      isOpen: false
    };
  }

  _onToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  _onSelectGroup(eventKey) {
    browserHistory.push(`/groups/${eventKey}`);
  }

  renderGroupsSelector() {
    const { groups, currentGroup } = this.props;
    const showSelector = groups.length > 1;
    const classes = classNames({
      [styles.dropDownMenu]: true,
      [styles.dropDownMenu_group]: true,
      [styles.dropDownMenu_noSelector]: !showSelector,
    });

    if (!showSelector) {
      return (
        <div className={classes}>
          {renderName(currentGroup, showSelector)}
        </div>
      );
    }

    return (
      <div className={classes}>
        <DropdownButton
          onSelect={this.onSelecGroup}
          id="group_selector"
          bsStyle="link"
          title={renderName(currentGroup, showSelector)}
        >
          <MenuItem header>Tus grupos</MenuItem>
          <MenuItem divider/>
          {groups.map((group) => {
            const { id } = group;

            return (
              <MenuItem
                key={id}
                eventKey={id}
                onSelect={this.onSelectGroup}
              >
                {group.name}
              </MenuItem>
            );
          })}
        </DropdownButton>
      </div>
    );
  }

  render() {
    const { user, hideSignupButton, hideLoginButton } = this.props;
    const { isOpen } = this.state;

    return (
        <nav
          className={classNames({
            'navar navbar-fixed-top': true,
            [styles.header]: !user,
            [styles.header_responsive]: user,
          })}
        >
        <div className="wrap container-fluid">
          <div className="row">
            <div className={`col-xs-12 ${styles.headerWrapper}`}>
              <div className={styles.logoWrapper}>
                {this.renderGroupsSelector()}
              </div>

              <UserMenu />

              <div
                className={classNames({
                  [styles.menu]: true,
                  [styles.isOpen]: isOpen,
                })}
              >
                <LoggedOut
                  hideSignupButton={hideSignupButton}
                  hideLoginButton={hideLoginButton}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  groups: state.groupsReducer.groups.entities,
});
export default connect(mapStateToProps)(Header);
