import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import layoutCentered from 'components/HOC/LayoutCentered';

import ProfileCompleteForm from 'components/forms/Profile/Complete';

import styles from '../../styles/layouts/index.scss';
import { checkInvitation, complete } from 'redux/modules/invitations/complete';

class InvitationComplete extends Component {
  static propTypes = {
    completeInvitation: PropTypes.func.isRequired,
    validInvitation: PropTypes.bool.isRequired,
    invitationDone: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillMount() {
    const { validInvitation } = this.props;

    if (validInvitation) return;

    browserHistory.push('/');
  }

  componentWillReceiveProps(newProps) {
    const { invitationDone: oldInvitation } = this.props;
    const { invitationDone } = newProps;

    if (oldInvitation === invitationDone) return;

    browserHistory.push('/');
  }

  /**
  * Submit signup create form
  *
  * @param {Object} fields
  */
  _handleSubmit(fields) {
    const { params: { token }, completeInvitation } = this.props;
    return completeInvitation(token, fields);
  }

  render() {
    return (
      <div className={styles.layoutCentered}>
        <Helmet title="Completa tu perfil"/>
        <div className={styles.layoutCentered__body}>
          <ProfileCompleteForm
            onSubmit={this.handleSubmit}
            reducerKey="completeInvitationReducer"
          />
        </div>
      </div>
    );
  }
}

const asyncConnectProps = [{
  promise: (options) => {
    const { store: { dispatch }, params: { token } } = options;
    return dispatch(checkInvitation(token));
  },
}];

const mapStateToProps = ({ completeInvitationReducer: { validInvitation, invitationDone }}) => ({
  validInvitation,
  invitationDone,
});

export default compose(
  layoutCentered,
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps, { completeInvitation: complete })
)(InvitationComplete);
