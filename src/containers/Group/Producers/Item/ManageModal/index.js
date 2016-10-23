import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Modal } from 'react-bootstrap';

import Button from 'components/Button';
import EditProducerForm, { EDIT_PRODUCER_FORM } from 'components/forms/producers/Edit';
import Products from '../Products/Base';

import styles from './styles/index.scss';

const TABS = {
  details: 'details',
  products: 'products',
};

class ManageModal extends Component {
  static propTypes = {
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

    this.state = {
      activeTab: TABS.details,
    };
  }

  /**
   * Render producer navigation
   */
  _handleTabChange(activeTab) {
    this.setState({ activeTab });
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
          producer={producer}
          initialValues={{
            name: producer.name,
            address: producer.address,
          }}
        />
    );
  }

  /**
   * Render products list
   */
  renderProducts() {
    const { activeTab } = this.state;

    if (activeTab !== TABS.products) return null;

    const { producer } = this.props;

    return (<Products producer={producer} />);
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
    const { producer, showModal, onCloseModal } = this.props;

    return (
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{producer.name}</Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            {this.renderNavigation()}
            <div className={styles.content}>
              {this.renderDetails()}
              {this.renderProducts()}
            </div>
          </Modal.Body>

          {this.renderFooterModal()}
        </form>
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

export default connect(mapStateToProps)(ManageModal);
