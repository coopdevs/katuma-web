import _ from 'underscore';
import { createSelector } from 'reselect';

const getTotal = (orderLine) => {
  return orderLine.quantity * orderLine.price;
};

export const getOrderLines = createSelector(
  [
    (state, props) => state.orderLinesReducer.orderLines.byOrderId[props.params.order_id] || [],
    (state) => state.productsReducer.products.byId,
  ],
  (orderLines, productsById) => {
    return orderLines.map((orderLine) => {
      return {
        ...productsById[orderLine.product_id],
        ...orderLine,
        total: getTotal(orderLine),
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
