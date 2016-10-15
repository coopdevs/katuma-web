import _ from 'underscore';

const LOAD = 'redux-example/producers/LOAD';
const LOAD_SUCCESS = 'redux-example/producers/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/producers/LOAD_FAIL';
const LOAD_PRODUCER = 'redux-example/producers/LOAD_PRODUCER';
const LOAD_PRODUCER_SUCCESS = 'redux-example/producers/LOAD_PRODUCER_SUCCESS';
const LOAD_PRODUCER_FAIL = 'redux-example/producers/LOAD_PRODUCER_FAIL';
const CREATE_PRODUCER = 'redux-example/producers/CREATE_PRODUCER';
const CREATE_PRODUCER_SUCCESS = 'redux-example/producers/CREATE_PRODUCER_SUCCESS';
const CREATE_PRODUCER_FAIL = 'redux-example/producers/CREATE_PRODUCER_FAIL';

const initialState = {
  producers: { entities: [], byId: {} },
  createdDone: false,
  errors: null,
};

export default function producersReducer(state = initialState, action = {}) {
  let entities;

  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        createdDone: false,
      };

    case LOAD_SUCCESS:
      entities = action.result;

      return {
        ...state,
        loading: false,
        producers: {
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

    case LOAD_PRODUCER:
      return {
        ...state,
        loading: true,
        createdDone: false,
      };

    case LOAD_PRODUCER_SUCCESS:
      entities = [...state.producers.entities, action.result];

      return {
        ...state,
        loading: false,
        producers: {
          entities: entities,
          byId: _.indexBy(entities, 'id'),
        },
        createdDone: true,
      };

    case LOAD_PRODUCER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        createdDone: false,
      };

    case CREATE_PRODUCER:
      return {
        ...state,
        errors: null,
      };

    case CREATE_PRODUCER_SUCCESS:
      entities = [...state.producers.entities, action.result];

      return {
        ...state,
        producers: {
          entities,
          byId: _.indexBy(entities, 'id')
        },
        errors: null,
      };

    case CREATE_PRODUCER_FAIL:
      return {
        ...state,
        errors: action.error,
      };

    default:
      return state;
  }
}

/**
 * Load producers for that group
 */
export function load(groupId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/producers?group_id=${groupId}`)
  };
}

export function loadEntity(id) {
  return {
    types: [LOAD_PRODUCER, LOAD_PRODUCER_SUCCESS, LOAD_PRODUCER_FAIL],
    promise: (client) => client.get(`/producers/${id}`)
  };
}

/**
 * Create api call on producers
 *
 * @param {Object} data
 */
export function create(data) {
  return {
    types: [CREATE_PRODUCER, CREATE_PRODUCER_SUCCESS, CREATE_PRODUCER_FAIL],
    promise: (client) => client.post('/producers', { data }),
  };
}
