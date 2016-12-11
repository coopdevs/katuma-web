import React, { PropTypes } from 'react';
import classNames from 'classnames';

import { getColorFromName } from './services/color';
import styles from './styles/index.scss';

const getClasses = ({ size }) => (
  classNames({
    [styles.avatar]: true,
    [styles.avatar_small]: !size,
  })
);

const Avatar = (props) => {
  const { name } = props;
  const { background, color } = getColorFromName(name);

  return (
    <div
      className={getClasses(props)}
      style={{ backgroundColor: background }}
    >
      <span style={{ color }}>{name}</span>
    </div>
  );
};

Avatar.PropTypes = {
  name: PropTypes.string.isRequired,
};

export default Avatar;
