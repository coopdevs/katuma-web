import React, { PropTypes }from 'react';

import styles from './styles/index.scss';

const ICON_SIZES = {
  small: 16,
};

const Icon = ({ glyph, size = 'small', extraClassName }) => {
  const sizeUnits = ICON_SIZES[size] || ICON_SIZES.small;

  return (
    <svg
      className={`${styles.icon} ${extraClassName}`}
      width={sizeUnits}
      height={sizeUnits}
    >
      <use xlinkHref={glyph} />
    </svg>
  );
};

Icon.propTypes = {
  glyph: PropTypes.string.isRequired,
  size: PropTypes.string,
  extraClassName: PropTypes.string,
};

export default Icon;
