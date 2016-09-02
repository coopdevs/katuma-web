import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Button from 'components/Button';

import styles from '../../styles/access-footer.scss';

const renderSignupLink = ({ onClickSignup }, text) => {
  if (!onClickSignup) {
    return (<Link to="/signup">{text}</Link>);
  }

  return (
    <Button type="button" linkLookAndFeel onClick={onClickSignup}>{text}</Button>
  );
};

const LoginFooter = (props) => (
  <div className={styles.accessFooter}>
    <p>Si no tienes cuenta {renderSignupLink(props, 'Creala ahora')}</p>
  </div>
);

LoginFooter.PropTypes = {
  onClickSignup: PropTypes.func,
};

export default LoginFooter;
