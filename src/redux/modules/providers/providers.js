import _ from 'underscore';

const LOAD = 'redux-example/providers/LOAD';
const LOAD_SUCCESS = 'redux-example/providers/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/providers/LOAD_FAIL';
const LOAD_PROVIDER = 'redux-example/providers/LOAD_PROVIDER';
const LOAD_PROVIDER_SUCCESS = 'redux-example/providers/LOAD_PROVIDER_SUCCESS';
const LOAD_PROVIDER_FAIL = 'redux-example/providers/LOAD_PROVIDER_FAIL';

const initialState = {
  providers: { entities: [], byId: {} },
};

export default function providersReducer(state = initialState, action = {}) {
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
        providers: {
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

    case LOAD_PROVIDER:
      return {
        ...state,
        loading: true,
      };

    case LOAD_PROVIDER_SUCCESS:
      entities = [...state.providers.entities, action.result];

      return {
        ...state,
        loading: false,
        providers: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
        },
      };

    case LOAD_PROVIDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export function load(groupId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/providers?group_id=${groupId}`)
  };
}

export function loadEntity(id) {
  return {
    types: [LOAD_PROVIDER, LOAD_PROVIDER_SUCCESS, LOAD_PROVIDER_FAIL],
    promise: (client) => client.get(`/providers/${id}`)
  };
}
