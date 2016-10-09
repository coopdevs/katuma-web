import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import styles from './styles/index.scss';

/**
 * Get button size
 *
 * @param {String} size
 * @param {Boolean}
 */
function isSize(size) {
  switch (size) {
    case 'lg':
      return true;
    case 'sm':
      return true;
    case 'xs':
      return true;
    default:
      return false;
  }
}

/**
 * Get css classes for button
 *
 * @param {String} error
 * @param {Sting}
 */
function getClasses({ link, primary, linkLookAndFeel, size }) {
  return classNames({
    'btn': true,
    'btn-primary': (!link && !linkLookAndFeel),
    'btn-success': primary,
    'btn-link': link,
    'btn-lg': isSize(size),
    'btn-sm': isSize(size),
    'btn-xs': isSize(size),
    [styles.link]: linkLookAndFeel,
  });
}

const renderContent = (text, processing) => (
  <div className={styles.buttonInner}>
    {text}
    {processing && <div className={styles.spinner}/>}
  </div>
);

const renderButton = (attributes, text, processing) => (
  <button {...attributes}>
    {renderContent(text, processing)}
  </button>
);

const renderLink = (attributes, text, processing) => (
  <Link to={attributes.linkTo} {...attributes}>
    {renderContent(text, processing)}
  </Link>
);

const Button = (props) => {
  const {
    children,
    processing,
    processingText,
    ...rest,
  } = props;

  let attr = {...rest};

  if (processing) {
    attr = {
      ...attr,
      disabled: true,
    };
  }

  const processingTextCopy = processingText || 'Enviando';
  const text = processing ? `${processingTextCopy}...` : children;
  const attributes = {
    ...attr,
    className: getClasses(props),
  };

  if (attributes.linkTo) return (renderLink(attributes, text, processing));

  return (renderButton(attributes, text, processing));
};

Button.PropTypes = {
  children: PropTypes.any,
  primary: PropTypes.bool,
  link: PropTypes.bool,
  processing: PropTypes.bool,
  processingText: PropTypes.string,
  size: PropTypes.string,
  linkLookAndFeel: PropTypes.bool,
  linkTo: PropTypes.string,
};
export default Button;
