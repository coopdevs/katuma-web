import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { create as createProducer } from 'redux/modules/producers/producers';
import CreateProducerForm, { CREATE_PRODUCER_FORM } from 'components/forms/producers/Create';
import Button from 'components/Button';

class CreateProducerModal extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired,
    onCreated: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onSubmitCreateProducer = this._onSubmitCreateProducer.bind(this);
    this.onClickCreate = this._onClickCreate.bind(this);
  }

  /**
   * Trigger form submit
   */
  _onClickCreate() {
    this._producer_form.submit();
  }

  /**
   * Submit edit producer form
   *
   * @param {Object} fields
   */
  _onSubmitCreateProducer(fields) {
    return this.props.create(fields);
  }

  /**
   * Set now modal type
   *
   * @param {String} modalType
   */
  changeModalType(modalType) {
    this.setState({ modalType });
  }

  render() {
    const {
      group,
      submitting,
      showModal,
      onCloseModal,
      onCreated,
    } = this.props;

    return (
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crea un productor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CreateProducerForm
            ref={(domNode) => this._producer_form = domNode}
            onSubmit={this.onSubmitCreateProducer}
            onCreated={onCreated}
            initialValues={{ group_id: group.id }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            primary
            processing={!!submitting}
            onClick={this.onClickCreate}
            type="submit"
          >
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({ form: allForms }) => {
  const form = allForms[CREATE_PRODUCER_FORM];

  if (!form) return {};

  return { submitting: form.submitting };
};

export default connect(
  mapStateToProps,
  { create: createProducer }
)(CreateProducerModal);
