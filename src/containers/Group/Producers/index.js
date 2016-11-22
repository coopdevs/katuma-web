import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import { load as loadSuppliers, create } from 'redux/modules/suppliers/suppliers';
import { load as loadProducers } from 'redux/modules/producers/producers';
import { isRole } from 'presenters/member';
import Button from 'components/Button';

import { producersByStatus } from './selectors';
import Item from './Item/';
import CreateProducerModal from './CreateProducerModal';

class GroupProducers extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    activeProducers: PropTypes.array.isRequired,
    inactiveProducers: PropTypes.array.isRequired,
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
   * Open modal
   */
  _onOpenModal() {
    this.setState({ showModal: true });
  }

  /**
   * Open modal
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

  /**
   * Render in-active producers list
   */
  renderInactiveProducers() {
    const { inactiveProducers, user, group } = this.props;

    if (!inactiveProducers.length) return (<span>Ningun productor inactivo</span>);

    return (
      <ul>
        {inactiveProducers.map((producer) => (
          <Item key={producer.id} user={user} producer={producer} group={group} />
        ))}
      </ul>
    );
  }

  /**
   * Render active producers list
   */
  renderActiveProducers() {
    const { user, activeProducers, group } = this.props;

    if (!activeProducers.length) return (<span>Ningun productor activo</span>);

    return (
      <ul>
        {activeProducers.map((producer) => (
          <Item key={producer.id} user={user} producer={producer} group={group} />
        ))}
      </ul>
    );
  }

  render() {
    const { group } = this.props;

    return (
      <div>
        <Helmet title={`Productores de ${group.name}`}/>

        <h3>Productores</h3>
        {this.renderCreateProducer()}
        <h4>Activos</h4>
        {this.renderActiveProducers()}
        <h4>Inactivos</h4>
        {this.renderInactiveProducers()}
      </div>
    );
  }
}

const mapStateToProps = (_state, ownProps) => {
  return (state) => {
    const selector = producersByStatus();
    const { activeProducers, inactiveProducers } = selector(state, ownProps);

    return { activeProducers, inactiveProducers };
  };
};

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
)(GroupProducers);
