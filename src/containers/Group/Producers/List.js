import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { create } from 'redux/modules/suppliers/suppliers';

import Item from './Item';
import CreateProducerModal from './CreateProducerModal';
import { isRole } from 'presenters/member';
import Button from 'components/Button';

class List extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    producers: PropTypes.array.isRequired,
    group: PropTypes.object.isRequired,
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
   * Render producers list
   */
  renderProducersList() {
    const { producers, group } = this.props;

    if (!producers.length) return (<span>Ningun productor en este grupo</span>);

    return (
      <ul>
        {producers.map((producer) => {
          return (
            <li key={producer.id}>
              <Item producer={producer} group={group} />
            </li>
          );
        })}
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
        {this.renderProducersList()}
      </div>
    );
  }
}

export default connect(() => ({}), { createSupplier: create })(List);
