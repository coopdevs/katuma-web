import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Modal } from 'react-bootstrap';

import Button from 'components/Button';
import { edit } from 'redux/modules/producers/producers';
import EditProducerForm, { EDIT_PRODUCER_FORM } from 'components/forms/producers/Edit';

import styles from './styles/index.scss';

const TABS = {
  details: 'details',
  products: 'products',
};

const DEFAULT_TAB = TABS.products;

class ManageModal extends Component {
  static propTypes = {
    editProducer: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    producer: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.handleTabChange = this._handleTabChange.bind(this);
    this.onClickEdit = this._onClickEdit.bind(this);
    this.onSubmitEditProducer = this._onSubmitEditProducer.bind(this);
    this.onCloseModal = this._onCloseModal.bind(this);

    this.state = {
      activeTab: DEFAULT_TAB,
    };
  }

  /**
   * Render producer navigation
   */
  _handleTabChange(activeTab) {
    this.setState({ activeTab });
  }

  /**
   * Submit edit producer form
   *
   * @param {Object} fields
   */
  _onSubmitEditProducer(fields) {
    const { producer, editProducer } = this.props;

    return editProducer(producer.id, fields);
  }

  /**
   * When close modal
   */
  _onCloseModal() {
    const { onCloseModal } = this.props;

    this.setState({ activeTab: DEFAULT_TAB });
    onCloseModal();
  }

  /**
   * Trigger form submit
   */
  _onClickEdit() {
    this._producer_form.submit();
  }

  /**
   * Render producer navigation.
   */
  renderNavigation() {
    const { activeTab } = this.state;

    return (
      <Nav bsClass="nav nav-tabs nav-tabs--centered" activeKey={activeTab} onSelect={this.handleTabChange}>
        <NavItem eventKey={TABS.products}>Productos</NavItem>
        <NavItem eventKey={TABS.details}>Detalles</NavItem>
      </Nav>
    );
  }

  /**
   * Render edit producer details
   */
  renderDetails() {
    const { activeTab } = this.state;

    if (activeTab !== TABS.details) return null;

    const { producer } = this.props;

    return (
      <EditProducerForm
        ref={(domNode) => this._producer_form = domNode}
        onSubmit={this.onSubmitEditProducer}
        producer={producer}
        initialValues={{
          name: producer.name,
          address: producer.address,
        }}
      />
    );
  }

  /**
   * Render modal footer
   */
  renderFooterModal() {
    const { activeTab } = this.state;

    if (activeTab !== TABS.details) return null;

    const { submitting } = this.props;

    return (
      <Modal.Footer>
        <Button
          primary
          processing={!!submitting}
          onClick={this.onClickEdit}
          type="submit"
        >
          Editar
        </Button>
      </Modal.Footer>
    );
  }

  render() {
    const { producer, showModal } = this.props;

    return (
      <Modal show={showModal} onHide={this.onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{producer.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.renderNavigation()}
          <div className={styles.content}>
            {this.renderDetails()}
          </div>
        </Modal.Body>

        {this.renderFooterModal()}
      </Modal>
    );
  }
}

export default ManageModal;
const mapStateToProps = ({ form: allForms }) => {
  const form = allForms[EDIT_PRODUCER_FORM];

  if (!form) return {};

  return { submitting: form.submitting };
};

export default connect(mapStateToProps, { editProducer: edit })(ManageModal);
