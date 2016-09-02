import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import styles from './styles/index.scss';

/**
 * Get css classes for button
 *
 * @param {String} error
 * @param {Sting}
 */
function getClasses({ primary, linkLookAndFeel }) {
  return classNames({
    'btn': true,
    'btn-primary': !linkLookAndFeel,
    'btn-success': primary,
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
  processing: PropTypes.bool,
  processingText: PropTypes.string,
  linkLookAndFeel: PropTypes.bool,
  linkTo: PropTypes.string,
};
export default Button;
