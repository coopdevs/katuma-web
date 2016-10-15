import _ from 'underscore';

const LOAD = 'redux-example/suppliers/LOAD';
const LOAD_SUCCESS = 'redux-example/suppliers/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/suppliers/LOAD_FAIL';
const LOAD_SUPPLIER = 'redux-example/suppliers/LOAD_SUPPLIER';
const LOAD_SUPPLIER_SUCCESS = 'redux-example/suppliers/LOAD_SUPPLIER_SUCCESS';
const LOAD_SUPPLIER_FAIL = 'redux-example/suppliers/LOAD_SUPPLIER_FAIL';

const initialState = {
  suppliers: { entities: [], byId: {}, byProducerId: {} },
  loading: false,
};

export default function suppliersReducer(state = initialState, action = {}) {
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
        suppliers: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
          byProducerId: _.indexBy(entities, 'producer_id'),
        },
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case LOAD_SUPPLIER:
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUPPLIER_SUCCESS:
      entities = [...state.suppliers.entities, action.result];

      return {
        ...state,
        loading: false,
        suppliers: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
          byProducerId: _.indexBy(entities, 'producer_id'),
        },
      };

    case LOAD_SUPPLIER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

/**
 * Load suppliers scoped by group
 *
 * @param {Number} groupId
 */
export function load(groupId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/suppliers?group_id=${groupId}`)
  };
}

export function loadEntity(id) {
  return {
    types: [LOAD_SUPPLIER, LOAD_SUPPLIER_SUCCESS, LOAD_SUPPLIER_FAIL],
    promise: (client) => client.get(`/suppliers/${id}`)
  };
}
