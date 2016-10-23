import _ from 'underscore';

const LOAD = 'redux-example/products/LOAD';
const LOAD_SUCCESS = 'redux-example/products/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/products/LOAD_FAIL';
const CREATE_PRODUCT = 'redux-example/products/CREATE_PRODUCT';
const CREATE_PRODUCT_SUCCESS = 'redux-example/products/CREATE_PRODUCT_SUCCESS';
const CREATE_PRODUCT_FAIL = 'redux-example/products/CREATE_PRODUCT_FAIL';

const initialState = {
  products: { entities: [], byId: {}, byProducerId: [] },
  loading: false,
  creating: false,
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
        creating: true,
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
        creating: false,
        errors: null,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        errors: action.error,
        creating: null,
      };

    default:
      return state;
  }
}

/**
 * Load products for that producer
 *
 * @param producerId
 */
export function load(producerId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/products?producer_id=${producerId}`)
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
