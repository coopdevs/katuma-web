import React, { Component, PropTypes } from 'react';

import Item from '../Item';
import AddProductsModal from '../../AddProductsModal';
import Button from 'components/Button';
import styles from './styles/index.scss';

class List extends Component {
  static propTypes = {
    orderLines: PropTypes.array.isRequired,
    grandTotal: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.onOpenModal = this._onOpenModal.bind(this);
    this.onCloseModal = this._onCloseModal.bind(this);

    this.state = { showModal: false };
  }

  /**
   * Open modal
   */
  _onOpenModal() {
    this.setState({ showModal: true });
  }

  /**
   * Close modal
   */
  _onCloseModal() {
    this.setState({ showModal: false });
  }

  renderAddProducts() {
    const { showModal } = this.state;

    return (
      <div>
        <Button primary onClick={this.onOpenModal}>+</Button>

        <AddProductsModal
          showModal={showModal}
          onCloseModal={this.onCloseModal}
        />
      </div>
    );
  }

  render() {
    const { orderLines, grandTotal } = this.props;

    if (!orderLines.length) return null;

    return (
      <table className={`table ${styles.productList}`}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Unidades</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderLines.map((orderLine) => <Item key={orderLine.id} orderLine={orderLine} />)}
        </tbody>
        <tfoot>
          <tr>
            <td>
              {this.renderAddProducts()}
            </td>
            <td/>
            <td/>
            <td/>
            <td>
              {grandTotal}
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default List;
