import React, { PropTypes } from 'react';
import classNames from 'classnames';

const renderDissmisButton = (onDissmis) => {
  if (!onDissmis) return (<noscript />);

  return (
    <button
      type="button"
      onClick={onDissmis}
      className="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">×</span>
    </button>
  );
};

const MessagePane = ({ isVisible, children, type, onDissmis }) => {
  if (!isVisible) return (<noscript />);

  return (
      <div
        className={classNames({
          'alert': true,
          'alert-info': !type,
          'alert-danger': type === 'error',
        })}
      >
        {renderDissmisButton(onDissmis)}
        {children}
    </div>
  );
};

MessagePane.PropTypes = {
  children: PropTypes.any.isRequired,
  onDissmis: PropTypes.func,
  isVisible: PropTypes.bool,
  type: PropTypes.string,
};

export default MessagePane;
