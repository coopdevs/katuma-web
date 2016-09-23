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
  producers: {entities: []},
  createProducerErrors: {},
};

export default function producersReducer(state = initialState, action = {}) {
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
      };

    case LOAD_PRODUCER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CREATE_PRODUCER:
      return {
        ...state,
      };

    case CREATE_PRODUCER_SUCCESS:
      entities = [...state.producers.entities, action.result];

      return {
        ...state,
        producers: {
          entities,
          byId: _.indexBy(entities, 'id')
        },
        createProducerErrors: {},
      };

    case CREATE_PRODUCER_FAIL:
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
    promise: (client) => client.get(`/producers?group_id=${groupId}`)
  };
}

export function loadEntity(id) {
  return {
    types: [LOAD_PRODUCER, LOAD_PRODUCER_SUCCESS, LOAD_PRODUCER_FAIL],
    promise: (client) => client.get(`/producers/${id}`)
  };
}

export function create(data) {
  return {
    types: [CREATE_PRODUCER, CREATE_PRODUCER_SUCCESS, CREATE_PRODUCER_FAIL],
    promise: (client) => client.post('/producers', {
      data: _.omit(data, 'group_id'),
      header: { key: 'X-katuma-group-id-for-provider', value: data.group_id },
    })
  };
}
