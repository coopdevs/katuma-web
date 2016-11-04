import _ from 'underscore';

const LOAD = 'redux-example/order_lines/LOAD';
const LOAD_SUCCESS = 'redux-example/order_lines/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/order_lines/LOAD_FAIL';
const CREATE_ORDER_LINE = 'redux-example/order_lines/CREATE_ORDER_LINE';
const CREATE_ORDER_LINE_SUCCESS = 'redux-example/order_lines/CREATE_ORDER_LINE_SUCCESS';
const CREATE_ORDER_LINE_FAIL = 'redux-example/order_lines/CREATE_ORDER_LINE_FAIL';
const EDIT_ORDER_LINE = 'redux-example/order_lines/EDIT_ORDER_LINE';
const EDIT_ORDER_LINE_SUCCESS = 'redux-example/order_lines/EDIT_ORDER_LINE_SUCCESS';
const EDIT_ORDER_LINE_FAIL = 'redux-example/order_lines/EDIT_ORDER_LINE_FAIL';
const RESET_FORM = 'redux-example/order_lines/RESET_FORM';

import mergeResponse from 'redux/lib/merge';

const initialState = {
  orderLines: { entities: [], byId: {}, byOrderId: [] },
  loading: false,
  errors: null,
};

export default function orderLinesReducer(state = initialState, action = {}) {
  let entities;

  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      entities = action.result;

      return {
        ...state,
        loading: false,
        orderLines: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
          byOrderId: _.groupBy(entities, 'order_id'),
        },
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CREATE_ORDER_LINE:
      return {
        ...state,
        errors: null,
      };

    case CREATE_ORDER_LINE_SUCCESS:
      entities = [...state.order_lines.entities, action.result];

      return {
        ...state,
        orderLines: {
          entities,
          byId: _.indexBy(entities, 'id'),
          byOrderId: _.groupBy(entities, 'order_id'),
        },
        errors: null,
      };

    case CREATE_ORDER_LINE_FAIL:
      return {
        ...state,
        errors: action.error,
      };

    case EDIT_ORDER_LINE:
      return {
        ...state,
        errors: null,
      };

    case EDIT_ORDER_LINE_SUCCESS:
      entities = mergeResponse(state.producers.entities, action.result);

      return {
        ...state,
        orderLines: {
          entities,
          byId: _.indexBy(entities, 'id'),
          byOrderId: _.groupBy(entities, 'order_id'),
        },
        errors: null,
      };

    case EDIT_ORDER_LINE_FAIL:
      return {
        ...state,
        errors: action.error,
      };

    case RESET_FORM:
      return {
        ...state,
        errors: null,
      };

    default:
      return state;
  }
}

/**
 * Reset errors
 */
export function reset() {
  return { type: RESET_FORM };
}

/**
 * Load order_lines for an order
 *
 * @param orderId
 */
export function load(orderId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/order_lines?order_id=${orderId}`)
  };
}

/**
 * Create api call on order_lines
 *
 * @param {Object} data
 */
export function create(data) {
  return {
    types: [CREATE_ORDER_LINE, CREATE_ORDER_LINE_SUCCESS, CREATE_ORDER_LINE_FAIL],
    promise: (client) => client.post('/order_lines', { data }),
  };
}

/**
 * Edit api call on order_lines
 *
 * @param {Object} data
 */
export function edit(id, data) {
  return {
    types: [EDIT_ORDER_LINE, EDIT_ORDER_LINE_SUCCESS, EDIT_ORDER_LINE_FAIL],
    promise: (client) => client.put(`/order_lines/${id}`, { data }),
  };
}
