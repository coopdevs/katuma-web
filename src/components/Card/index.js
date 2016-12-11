import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './styles/index.scss';

const Card = ({ children }) => {
  return (
    <div
      className={classNames({
        [styles.card]: true,
        'shadow--2dp': true,
      })}
    >
      {children}
    </div>
  );
};

Card.PropTypes = {
  children: PropTypes.any.isRequired,
};

export default Card;
