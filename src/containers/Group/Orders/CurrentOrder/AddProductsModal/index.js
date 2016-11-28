import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

import Button from 'components/Button';

class AddProductsModal extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired,
  };

  render() {
    const { showModal, onCloseModal } = this.props;

    return (
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Elige tus productos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          HOLA
        </Modal.Body>

        <Modal.Footer>
          <Button
            primary
            type="submit"
          >
            Hecho
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddProductsModal;
