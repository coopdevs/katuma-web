import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Button from 'components/Button';

import styles from '../../styles/access-footer.scss';

const renderLoginLink = ({ onClickLogin }, text) => {
  if (!onClickLogin) {
    return (<Link to="/login">{text}</Link>);
  }

  return (
      <Button type="button" linkLookAndFeel onClick={onClickLogin}>{text}</Button>
  );
};

const SignupFooter = (props) => (
    <div className={styles.accessFooter}>
    <p>¿Ya estás registrado? {renderLoginLink(props, 'Accede ahora')}</p>
    </div>
);

SignupFooter.PropTypes = {
  onClickLogin: PropTypes.func,
};

export default SignupFooter;
