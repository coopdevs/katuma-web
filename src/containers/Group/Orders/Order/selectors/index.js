import _ from 'underscore';
import { createSelector } from 'reselect';

const getTotal = (orderLine, product) => {
  return orderLine.quantity * product.price;
};

export const getOrderLines = createSelector(
  [
    (state, props) => state.orderLinesReducer.orderLines.byOrderId[props.params.order_id] || [],
    (state) => state.productsReducer.products.byId,
  ],
  (orderLines, productsById) => {
    return orderLines.map((orderLine) => {
      const product = productsById[orderLine.product_id];

      return {
        ...product,
        ...orderLine,
        total: getTotal(orderLine, product),
      };
    });
  }
);

export const getGrandTotal = createSelector(
  [
    getOrderLines
  ],
  (orderLines) => {
    return _.reduce(orderLines, (memo, orderLine) => {
      return memo + orderLine.total;
    }, 0);
  }
);
