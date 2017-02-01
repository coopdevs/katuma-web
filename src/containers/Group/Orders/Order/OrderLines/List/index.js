import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Item from '../Item';
import styles from './styles/index.scss';
import { getGrandTotal } from '../../selectors';

class List extends Component {
  static propTypes = {
    orderLines: PropTypes.array.isRequired,
    grandTotal: PropTypes.number.isRequired,
  }

  render() {
    const { orderLines, grandTotal } = this.props;

    return (
      <table className={`table ${styles.orderLineList}`}>
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
          {orderLines && orderLines.map((orderLine) => <Item key={orderLine.id} orderLine={orderLine} />)}
        </tbody>
        <tfoot>
          <tr>
            <td/>
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

const mapStateToProps = (state, props) => {
  return {
    grandTotal: getGrandTotal(state, props),
  };
};

export default connect(
  mapStateToProps
)(List);
