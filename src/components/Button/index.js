import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'underscore';

import styles from './styles/index.scss';

const PROP_TYPES = {
  children: PropTypes.any,
  primary: PropTypes.bool,
  link: PropTypes.bool,
  processing: PropTypes.bool,
  processingText: PropTypes.string,
  size: PropTypes.string,
  linkTo: PropTypes.string,
  linkLookAndFeel: PropTypes.bool,
};

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
    'btn-link': link && !primary,
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

const renderLink = (linkTo, attributes, text, processing) => (
  <Link to={linkTo} {...attributes}>
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

  const domAttributes = _.omit(attributes, _.keys(PROP_TYPES));

  if (attributes.linkTo) {
    return (renderLink(attributes.linkTo, domAttributes, text, processing));
  }

  return (renderButton(domAttributes, text, processing));
};

Button.PropTypes = PROP_TYPES;

export default Button;
