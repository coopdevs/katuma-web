import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import { load as loadSuppliers } from 'redux/modules/suppliers/suppliers';
import { load as loadProducers } from 'redux/modules/producers/producers';

/* import CreateProducerForm from 'components/forms/Producers/Create';*/
import { isRole } from 'presenters/member';
import List from './List';

class GroupProducersBase extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    producers: PropTypes.array.isRequired,
  }

  /**
   * If user is group admin she/he can create
   * producers
   */
  renderCreateProducerForm() {
    const { user } = this.props;

    console.log('isAdmin', isRole(user, 'admin'));
  }

  render() {
    const { group, producers } = this.props;

    return (
      <div>
        <Helmet title={`Proveedores de ${group.name}`}/>

        <h3>Productores</h3>

        {this.renderCreateProducerForm()}
        <div>
          <List group={group} producers={producers} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({ producersReducer: { entities: producers }}) => ({ producers });

const asyncConnectProps = [{
  promise: ({ store: { dispatch }, params: { id } }) => {
    const promises = [];
    promises.push(dispatch(loadProducers(id)));
    promises.push(dispatch(loadSuppliers(id)));

    return Promise.all(promises);
  },
}];

export default compose(
  asyncConnect(asyncConnectProps),
  connect(mapStateToProps)
)(GroupProducersBase);
