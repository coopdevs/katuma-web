import _ from 'underscore';

const LOAD = 'redux-example/orders/LOAD';
const LOAD_SUCCESS = 'redux-example/orders/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/orders/LOAD_FAIL';
const LOAD_ORDER = 'redux-example/orders/LOAD_ORDER';
const LOAD_ORDER_SUCCESS = 'redux-example/orders/LOAD_ORDER_SUCCESS';
const LOAD_ORDER_FAIL = 'redux-example/orders/LOAD_ORDER_FAIL';
const CREATE_ORDER = 'redux-example/orders/CREATE_ORDER';
const CREATE_ORDER_SUCCESS = 'redux-example/orders/CREATE_ORDER_SUCCESS';
const CREATE_ORDER_FAIL = 'redux-example/orders/CREATE_ORDER_FAIL';
const EDIT_ORDER = 'redux-example/orders/EDIT_ORDER';
const EDIT_ORDER_SUCCESS = 'redux-example/orders/EDIT_ORDER_SUCCESS';
const EDIT_ORDER_FAIL = 'redux-example/orders/EDIT_ORDER_FAIL';
const RESET_ORDER_FORM = 'redux-example/orders/RESET_ORDER_FORM';

import mergeResponse from 'redux/lib/merge';

const initialState = {
  orders: { entities: [], byId: {} },
  createdOrder: null,
  editedOrder: false,
  error: null,
  errors: null,
};

export default function ordersReducer(state = initialState, action = {}) {
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
        orders: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
        },
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case LOAD_ORDER:
      return {
        ...state,
        loading: true,
        createdOrder: null,
        errors: null,
      };

    case LOAD_ORDER_SUCCESS:
      entities = mergeResponse(state.orders.entities, action.result);

      return {
        ...state,
        loading: false,
        orders: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
        },
      };

    case LOAD_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CREATE_ORDER:
      return {
        ...state,
        errors: null,
        createdOrder: null,
      };

    case CREATE_ORDER_SUCCESS:
      entities = [...state.orders.entities, action.result];

      return {
        ...state,
        orders: {
          entities,
          byId: _.indexBy(entities, 'id')
        },
        createdOrder: action.result,
        errors: null,
      };

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        errors: action.error,
        createdOrder: null,
      };

    case EDIT_ORDER:
      return {
        ...state,
        errors: null,
        editedOrder: false,
      };

    case EDIT_ORDER_SUCCESS:
      entities = mergeResponse(state.orders.entities, action.result);

      return {
        ...state,
        orders: {
          entities,
          byId: _.indexBy(entities, 'id')
        },
        editedOrder: true,
        errors: null,
      };

    case EDIT_ORDER_FAIL:
      return {
        ...state,
        errors: action.error,
        editedOrder: false,
      };

    case RESET_ORDER_FORM:
      return {
        ...state,
        createdOrder: null,
        editedOrder: false,
      };

    default:
      return state;
  }
}

/**
 * Load orders for a given group
 *
 * TODO: move the query params to a library
 */
export function load(groupId, all) {
  let params = `/orders?to_group_id=${groupId}`;
  if (all === true) {
    params = params + '&all=true';
  }


  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(params)
  };
}

export function loadEntity(id) {
  return {
    types: [LOAD_ORDER, LOAD_ORDER_SUCCESS, LOAD_ORDER_FAIL],
    promise: (client) => client.get(`/orders/${id}`)
  };
}

/**
 * Create api call on orders
 *
 * @param {Object} data
 */
export function create(data) {
  return {
    types: [CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL],
    promise: (client) => client.post('/orders', { data }),
  };
}

/**
 * Edit api call on orders
 *
 * @param {Object} data
 */
export function edit(id, data) {
  return {
    types: [EDIT_ORDER, EDIT_ORDER_SUCCESS, EDIT_ORDER_FAIL],
    promise: (client) => client.put(`/orders/${id}`, { data }),
  };
}

/**
 * Reset errors when create/edit an order
 */
export function resetForm() {
  return { type: RESET_ORDER_FORM };
}
