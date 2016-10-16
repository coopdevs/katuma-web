import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import { load as loadSuppliers, create } from 'redux/modules/suppliers/suppliers';
import { load as loadProducers } from 'redux/modules/producers/producers';

import CreateProducerModal from './CreateProducerModal';
import { isRole } from 'presenters/member';
import List from './List';
import Button from 'components/Button';

class GroupProducersBase extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    producers: PropTypes.array.isRequired,
    createSupplier: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onOpenModal = this._onOpenModal.bind(this);
    this.onCloseModal = this._onCloseModal.bind(this);
    this.onProducerCreated = this._onProducerCreated.bind(this);

    this.state = { showModal: false };
  }

  /**
   * Open modal with login form
   */
  _onOpenModal() {
    this.setState({ showModal: true });
  }

  /**
   * Open modal with signup form
   */
  _onCloseModal() {
    this.setState({ showModal: false });
  }

  /**
   * When a new producer is created whe
   * close create producer modal/form and
   * create a new supplier relation on DB.
   *
   * @param {Object} producer
   */
  _onProducerCreated(producer) {
    const { createSupplier, group } = this.props;

    this.onCloseModal();
    createSupplier({ group_id: group.id, producer_id: producer.id });
  }

  /**
   * If user is group admin she/he can create
   * producers
   */
  renderCreateProducer() {
    const { group, user } = this.props;
    const isAdmin = isRole(user, 'admin');

    if (!isAdmin) return null;

    const { showModal } = this.state;

    return (
      <div>
        <Button primary onClick={this.onOpenModal}>Crear productor</Button>

        <CreateProducerModal
          showModal={showModal}
          group={group}
          onCloseModal={this.onCloseModal}
          onCreated={this.onProducerCreated}
        />
      </div>
    );
  }

  render() {
    const { group, producers } = this.props;

    return (
      <div>
        <Helmet title={`Productores de ${group.name}`}/>

        <h3>Productores</h3>
        {this.renderCreateProducer()}

        <div>
          <List group={group} producers={producers} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({ producersReducer: { producers: { entities: producers } } }) =>
  ({ producers });

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
  connect(mapStateToProps, { createSupplier: create })
)(GroupProducersBase);
