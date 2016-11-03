import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import styles from './styles/index.scss';

/**
 * Get css classes for field
 *
 * @param {String} error
 * @param {String} type
 * @param {Boolean} isLast
 * @param {Sting}
 */
function getInputClasses(error, type, isLast) {
  return classNames({
    'form-group': true,
    'has-error': !!error,
    'hidden': type === 'hidden',
    [styles.input_last]: isLast,
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
    case 'select':
      return 'select';
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
    min: PropTypes.number,
    element: PropTypes.string,
    selectOptions: PropTypes.array,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    errorsAlways: PropTypes.bool,
    setInitialFocus: PropTypes.bool,
    meta: PropTypes.object,
    isLast: PropTypes.bool,
  }

  componentDidMount() {
    if (!this.props.setInitialFocus) return;

    this.input_el.focus();
  }

  renderSelect(selectOptions, elementProps) {
    const { placeholder } = elementProps;
    return (
      <select value="2" {...elementProps}>
        {placeholder && <option>{placeholder}</option>}
        {selectOptions.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    );
  }

  render() {
    const {
      input, name, type, label, placeholder,
      errorsAlways, rows, isLast, selectOptions, min,
      meta: { touched, error }
    } = this.props;

    const element = getElement(type);

    const elementProps = {
      ...input,
      min,
      id: name,
      ref: (c) => (this.input_el = c),
      type,
      placeholder,
      className: 'form-control',
    };

    const hasErrors = errorsAlways ? !!error : touched && !!error;

    return (
      <div className={getInputClasses(hasErrors, type, isLast)}>
        {label && <label htmlFor={name}>{label}</label>}
        {element === 'input' && <input {...elementProps} />}
        {element === 'textarea' && <textarea rows={rows} {...elementProps} />}
        {element === 'select' && this.renderSelect(selectOptions, elementProps)}
        {hasErrors && <div className={`text-danger ${styles.error}`}>{error}</div>}
      </div>
    );
  }
}

export default Input;
