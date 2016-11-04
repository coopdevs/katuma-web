import _ from 'underscore';

import parseParamsToQueryString from 'helpers/api/queryStringParser';

const LOAD = 'redux-example/products/LOAD';
const LOAD_SUCCESS = 'redux-example/products/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/products/LOAD_FAIL';
const CREATE_PRODUCT = 'redux-example/products/CREATE_PRODUCT';
const CREATE_PRODUCT_SUCCESS = 'redux-example/products/CREATE_PRODUCT_SUCCESS';
const CREATE_PRODUCT_FAIL = 'redux-example/products/CREATE_PRODUCT_FAIL';
const EDIT_PRODUCT = 'redux-example/products/EDIT_PRODUCT';
const EDIT_PRODUCT_SUCCESS = 'redux-example/products/EDIT_PRODUCT_SUCCESS';
const EDIT_PRODUCT_FAIL = 'redux-example/products/EDIT_PRODUCT_FAIL';
const RESET_FORM = 'redux-example/products/RESET_FORM';

import mergeResponse from 'redux/lib/merge';

const initialState = {
  products: { entities: [], byId: {}, byProducerId: [] },
  loading: false,
  errors: null,
};

export default function productsReducer(state = initialState, action = {}) {
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
        products: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
          byProducerId: _.groupBy(entities, 'producer_id'),
        },
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        errors: null,
      };

    case CREATE_PRODUCT_SUCCESS:
      entities = [...state.products.entities, action.result];

      return {
        ...state,
        products: {
          entities,
          byId: _.indexBy(entities, 'id'),
          byProducerId: _.groupBy(entities, 'producer_id'),
        },
        errors: null,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        errors: action.error,
      };

    case EDIT_PRODUCT:
      return {
        ...state,
        errors: null,
      };

    case EDIT_PRODUCT_SUCCESS:
      entities = mergeResponse(state.producers.entities, action.result);

      return {
        ...state,
        products: {
          entities,
          byId: _.indexBy(entities, 'id'),
          byProducerId: _.groupBy(entities, 'producer_id'),
        },
        errors: null,
      };

    case EDIT_PRODUCT_FAIL:
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
 * Load products for that producer
 *
 * @param params {Object} group_id, producer_id
 */
export function load(params) {
  const queryParams = parseParamsToQueryString(params);

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/products${queryParams}`)
  };
}

/**
 * Create api call on products
 *
 * @param {Object} data
 */
export function create(data) {
  return {
    types: [CREATE_PRODUCT, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL],
    promise: (client) => client.post('/products', { data }),
  };
}

/**
 * Edit api call on products
 *
 * @param {Object} data
 */
export function edit(id, data) {
  return {
    types: [EDIT_PRODUCT, EDIT_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL],
    promise: (client) => client.put(`/products/${id}`, { data }),
  };
}
