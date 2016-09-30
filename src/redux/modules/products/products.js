import _ from 'underscore';

const LOAD = 'redux-example/products/LOAD';
const LOAD_SUCCESS = 'redux-example/products/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/products/LOAD_FAIL';
const LOAD_PRODUCT = 'redux-example/products/LOAD_PRODUCT';
const LOAD_PRODUCT_SUCCESS = 'redux-example/products/LOAD_PRODUCT_SUCCESS';
const LOAD_PRODUCT_FAIL = 'redux-example/products/LOAD_PRODUCT_FAIL';
const CREATE_PRODUCT = 'redux-example/products/CREATE_PRODUCT';
const CREATE_PRODUCT_SUCCESS = 'redux-example/products/CREATE_PRODUCT_SUCCESS';
const CREATE_PRODUCT_FAIL = 'redux-example/products/CREATE_PRODUCT_FAIL';

const initialState = {
  products: { entities: [], byId: {} },
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
        },
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case LOAD_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case LOAD_PRODUCT_SUCCESS:
      entities = [...state.products.entities, action.result];

      return {
        ...state,
        loading: false,
        products: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
        },
      };

    case LOAD_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
      };

    case CREATE_PRODUCT_SUCCESS:
      entities = [...state.products.entities, action.result];

      return {
        ...state,
        products: {
          entities,
          byId: _.indexBy(entities, 'id')
        },
        createProducerErrors: {},
      };

    case CREATE_PRODUCT_FAIL:
      const errorsKeys = Object.keys(action.error);
      // FIXME: Extract into utils. Here we're parsing API errors.
      // By default server returns an object with fields with erros.
      // And each field has an array of errors. Here we're picking
      // just first error for each field.
      const createProducerErrors = errorsKeys.reduce((formatedErrors, key) => {
        formatedErrors[key] = action.error[key][0];
        return formatedErrors;
      }, {});

      return {
        ...state,
        createProducerErrors: createProducerErrors
      };

    default:
      return state;
  }
}

export function load(groupId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/products?group_id=${groupId}`)
  };
}

export function loadEntity(id) {
  return {
    types: [LOAD_PRODUCT, LOAD_PRODUCT_SUCCESS, LOAD_PRODUCT_FAIL],
    promise: (client) => client.get(`/products/${id}`)
  };
}

export function create(data) {
  return {
    types: [CREATE_PRODUCT, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL],
    promise: (client) => client.post('/products', { data: data })
  };
}
