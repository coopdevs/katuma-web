import _ from 'underscore';

const LOAD = 'redux-example/suppliers/LOAD';
const LOAD_SUCCESS = 'redux-example/suppliers/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/suppliers/LOAD_FAIL';
const LOAD_SUPPLIER = 'redux-example/suppliers/LOAD_SUPPLIER';
const LOAD_SUPPLIER_SUCCESS = 'redux-example/suppliers/LOAD_SUPPLIER_SUCCESS';
const LOAD_SUPPLIER_FAIL = 'redux-example/suppliers/LOAD_SUPPLIER_FAIL';
const CREATE_SUPPLIER = 'redux-example/suppliers/CREATE_SUPPLIER';
const CREATE_SUPPLIER_SUCCESS = 'redux-example/suppliers/CREATE_SUPPLIER_SUCCESS';
const CREATE_SUPPLIER_FAIL = 'redux-example/suppliers/CREATE_SUPPLIER_FAIL';
const DELETE_SUPPLIER = 'redux-example/suppliers/DELETE_SUPPLIER';
const DELETE_SUPPLIER_SUCCESS = 'redux-example/suppliers/DELETE_SUPPLIER_SUCCESS';
const DELETE_SUPPLIER_FAIL = 'redux-example/suppliers/DELETE_SUPPLIER_FAIL';

const initialState = {
  suppliers: { entities: [], byId: {}, byGroupId: {} },
  loading: false,
  errors: null,
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
          byGroupId: _.groupBy(entities, 'group_id'),
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
          byGroupId: _.groupBy(entities, 'group_id'),
        },
      };

    case LOAD_SUPPLIER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CREATE_SUPPLIER:
      return {
        ...state,
        errors: null,
      };

    case CREATE_SUPPLIER_SUCCESS:
      entities = [...state.suppliers.entities, action.result];

      return {
        ...state,
        suppliers: {
          entities,
          byId: _.indexBy(entities, 'id'),
          byGroupId: _.groupBy(entities, 'group_id'),
        },
        errors: null,
      };

    case CREATE_SUPPLIER_FAIL:
      return {
        ...state,
        errors: action.error,
      };

    case DELETE_SUPPLIER_SUCCESS:
      entities = _.reject(state.suppliers.entities, (supplier) => {
        return supplier.id === action.requestData.id;
      });

      return {
        ...state,
        suppliers: {
          entities,
          byId: _.indexBy(entities, 'id'),
          byGroupId: _.groupBy(entities, 'group_id'),
        },
      };

    case DELETE_SUPPLIER:
    case DELETE_SUPPLIER_FAIL:
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

/**
 * Create api call on suppliers
 *
 * @param {Object} data
 */
export function create(data) {
  return {
    types: [CREATE_SUPPLIER, CREATE_SUPPLIER_SUCCESS, CREATE_SUPPLIER_FAIL],
    promise: (client) => client.post('/suppliers', { data }),
  };
}

/**
 * Delete supplier
 *
 * @param {Number} id
 */
export function destroy(id) {
  return {
    types: [DELETE_SUPPLIER, DELETE_SUPPLIER_SUCCESS, DELETE_SUPPLIER_FAIL],
    promise: (client) => client.delete(`/suppliers/${id}`, { data: { id }}),
    requestData: { id }
  };
}
