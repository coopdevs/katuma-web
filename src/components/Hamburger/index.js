import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './styles/index.scss';

const Hamburger = ({ isOpen, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={classNames({
        [styles.hamburger]: true,
        [styles.isOpen]: isOpen,
      })}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

Hamburger.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
};

export default Hamburger;
