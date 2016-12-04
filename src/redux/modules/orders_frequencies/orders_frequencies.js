import _ from 'underscore';

const LOAD = 'redux-example/orders_frequencies/LOAD';
const LOAD_SUCCESS = 'redux-example/orders_frequencies/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/orders_frequencies/LOAD_FAIL';
const LOAD_ORDERS_FREQUENCY = 'redux-example/orders_frequencies/LOAD_ORDERS_FREQUENCY';
const LOAD_ORDERS_FREQUENCY_SUCCESS = 'redux-example/orders_frequencies/LOAD_ORDERS_FREQUENCY_SUCCESS';
const LOAD_ORDERS_FREQUENCY_FAIL = 'redux-example/orders_frequencies/LOAD_ORDERS_FREQUENCY_FAIL';
const CREATE_ORDERS_FREQUENCY = 'redux-example/orders_frequencies/CREATE_ORDERS_FREQUENCY';
const CREATE_ORDERS_FREQUENCY_SUCCESS = 'redux-example/orders_frequencies/CREATE_ORDERS_FREQUENCY_SUCCESS';
const CREATE_ORDERS_FREQUENCY_FAIL = 'redux-example/orders_frequencies/CREATE_ORDERS_FREQUENCY_FAIL';
const EDIT_ORDERS_FREQUENCY = 'redux-example/orders_frequencies/EDIT_ORDERS_FREQUENCY';
const EDIT_ORDERS_FREQUENCY_SUCCESS = 'redux-example/orders_frequencies/EDIT_ORDERS_FREQUENCY_SUCCESS';
const EDIT_ORDERS_FREQUENCY_FAIL = 'redux-example/orders_frequencies/EDIT_ORDERS_FREQUENCY_FAIL';
const RESET_ORDERS_FREQUENCY_FORM = 'redux-example/orders_frequencies/RESET_ORDERS_FREQUENCY_FORM';

import mergeResponse from 'redux/lib/merge';

const initialState = {
  orders_frequencies: { entities: [], byId: {} },
  createdOrdersFrequency: null,
  editedOrdersFrequency: false,
  error: null,
  errors: null,
};

export default function ordersFrequenciesReducer(state = initialState, action = {}) {
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
        orders_frequencies: {
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

    case LOAD_ORDERS_FREQUENCY:
      return {
        ...state,
        loading: true,
        createdOrdersFrequency: null,
        errors: null,
      };

    case LOAD_ORDERS_FREQUENCY_SUCCESS:
      entities = mergeResponse(state.orders_frequencies.entities, action.result);

      return {
        ...state,
        loading: false,
        orders_frequencies: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
        },
      };

    case LOAD_ORDERS_FREQUENCY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CREATE_ORDERS_FREQUENCY:
      return {
        ...state,
        errors: null,
        createdOrdersFrequency: null,
      };

    case CREATE_ORDERS_FREQUENCY_SUCCESS:
      entities = [...state.orders_frequencies.entities, action.result];

      return {
        ...state,
        orders_frequencies: {
          entities,
          byId: _.indexBy(entities, 'id')
        },
        createdOrdersFrequency: action.result,
        errors: null,
      };

    case CREATE_ORDERS_FREQUENCY_FAIL:
      return {
        ...state,
        errors: action.error,
        createdOrdersFrequency: null,
      };

    case EDIT_ORDERS_FREQUENCY:
      return {
        ...state,
        errors: null,
        editedOrdersFrequency: false,
      };

    case EDIT_ORDERS_FREQUENCY_SUCCESS:
      entities = mergeResponse(state.orders_frequencies.entities, action.result);

      return {
        ...state,
        orders_frequencies: {
          entities,
          byId: _.indexBy(entities, 'id')
        },
        editedOrdersFrequency: true,
        errors: null,
      };

    case EDIT_ORDERS_FREQUENCY_FAIL:
      return {
        ...state,
        errors: action.error,
        editedOrdersFrequency: false,
      };

    case RESET_ORDERS_FREQUENCY_FORM:
      return {
        ...state,
        createdOrdersFrequency: null,
        editedOrdersFrequency: false,
      };

    default:
      return state;
  }
}

/**
 * Load orders_frequencies for a given group
 */
export function load(groupId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/orders_frequencies?group_id=${groupId}`)
  };
}

export function loadEntity(id) {
  return {
    types: [LOAD_ORDERS_FREQUENCY, LOAD_ORDERS_FREQUENCY_SUCCESS, LOAD_ORDERS_FREQUENCY_FAIL],
    promise: (client) => client.get(`/orders_frequencies/${id}`)
  };
}

/**
 * Create api call on orders_frequencies
 *
 * @param {Object} data
 */
export function create(data) {
  return {
    types: [CREATE_ORDERS_FREQUENCY, CREATE_ORDERS_FREQUENCY_SUCCESS, CREATE_ORDERS_FREQUENCY_FAIL],
    promise: (client) => client.post('/orders_frequencies', { data }),
  };
}

/**
 * Edit api call on orders_frequencies
 *
 * @param {Object} data
 */
export function edit(id, data) {
  return {
    types: [EDIT_ORDERS_FREQUENCY, EDIT_ORDERS_FREQUENCY_SUCCESS, EDIT_ORDERS_FREQUENCY_FAIL],
    promise: (client) => client.put(`/orders_frequencies/${id}`, { data }),
  };
}

/**
 * Reset errors when create/edit an order
 */
export function resetForm() {
  return { type: RESET_ORDERS_FREQUENCY_FORM };
}
