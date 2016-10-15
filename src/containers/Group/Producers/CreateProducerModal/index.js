import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import CreateProducerForm, { CREATE_PRODUCER_FORM } from 'components/forms/Producers/Create';
import Button from 'components/Button';

class UserAccessModal extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onClickCreate = this._onClickCreate.bind(this);
  }

  _onClickCreate() {
    this._producer_form.submit();
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
    const { group, submitting, showModal, onCloseModal } = this.props;

    return (
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crea un productor</Modal.Title>
        </Modal.Header>

        <form>
          <Modal.Body>
            <CreateProducerForm
              ref={(domNode) => this._producer_form = domNode}
              initialValues={{ group_id: group.id }}
              group={group}
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
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ form: allForms }) => {
  const form = allForms[CREATE_PRODUCER_FORM];

  if (!form) return {};

  return { submitting: form.submitting };
};

export default connect(mapStateToProps)(UserAccessModal);
