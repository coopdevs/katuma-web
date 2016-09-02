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

class Input extends Component {
  static propTypes = {
    input: PropTypes.object,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
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
      errorsAlways,
      meta: { touched, error }
    } = this.props;

    const hasErrors = errorsAlways ? !!error : touched && !!error;

    return (
      <div className={getInputClasses(error)}>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          ref={(c) => this.input_el = c}
          type={type}
          placeholder={placeholder}
          className="form-control"
          {...input}
        />

        {hasErrors && <div className={`text-danger ${styles.error}`}>{error}</div>}
      </div>
    );
  }
}

export default Input;
