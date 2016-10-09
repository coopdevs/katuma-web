import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import styles from './styles/index.scss';

/**
 * Get css classes for field
 *
 * @param {String} error
 * @param {Sting}
 */
function getInputClasses(error) {
  return classNames({
    'form-group': true,
    'has-error': !!error,
  });
}

/**
 * Get element based on type
 *
 * @param {String} type
 * @param {Sting}
 */
function getElement(type) {
  switch (type) {
    case 'textarea':
      return 'textarea';
    default:
      return 'input';
  }
}

class Input extends Component {
  static propTypes = {
    input: PropTypes.object,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    element: PropTypes.string,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    errorsAlways: PropTypes.bool,
    setInitialFocus: PropTypes.bool,
    meta: PropTypes.object,
  }

  componentDidMount() {
    if (!this.props.setInitialFocus) return;

    this.input_el.focus();
  }

  render() {
    const {
      input, name, type, label, placeholder,
      errorsAlways, rows,
      meta: { touched, error }
    } = this.props;

    const element = getElement(type);

    const elementProps = {
      ...input,
      id: name,
      ref: (c) => (this.input_el = c),
      type,
      placeholder,
      className: 'form-control',
    };

    const hasErrors = errorsAlways ? !!error : touched && !!error;

    return (
      <div className={getInputClasses(error)}>
        <label htmlFor={name}>{label}</label>
        {element === 'input' && <input {...elementProps} />}
        {element === 'textarea' && <textarea rows={rows} {...elementProps} />}
        {hasErrors && <div className={`text-danger ${styles.error}`}>{error}</div>}
      </div>
    );
  }
}

export default Input;
