import _ from 'underscore';

const LOAD_GROUPS = 'redux-example/groups/LOAD_GROUPS';
const LOAD_GROUPS_SUCCESS = 'redux-example/groups/LOAD_GROUPS_SUCCESS';
const LOAD_GROUPS_FAIL = 'redux-example/groups/LOAD_GROUPS_FAIL';
const CREATE_GROUP = 'redux-example/groups/CREATE_GROUP';
const CREATE_GROUP_SUCCESS = 'redux-example/groups/CREATE_GROUP_SUCCESS';
const CREATE_GROUP_FAIL = 'redux-example/groups/CREATE_GROUP_FAIL';

const initialState = {
  createGroupErrors: {},
  groups: {entities: [], byId: {}},
  entities: [],
  byId: {},
};

export default function groupsReducer(state = initialState, action = {}) {
  let entities;

  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
      };

    case CREATE_GROUP_SUCCESS:
      entities = [...state.entities, action.result];

      return {
        ...state,
        entities,
        byId: _.indexBy(entities, 'id'),
        createGroupErrors: {},
      };

    case CREATE_GROUP_FAIL:
      const errorsKeys = Object.keys(action.error);
      // FIXME: Extract into utils. Here we're parsing API errors.
      // By default server returns an object with fields with erros.
      // And each field has an array of errors. Here we're picking
      // just first error for each field.
      const createGroupErrors = errorsKeys.reduce((formatedErrors, key) => {
        formatedErrors[key] = action.error[key][0];
        return formatedErrors;
      }, {});

      return {
        ...state,
        createGroupErrors: createGroupErrors
      };

    case LOAD_GROUPS:
      return {
        ...state,
        loading: true
      };

    case LOAD_GROUPS_SUCCESS:
      entities = action.result;

      return {
        ...state,
        loading: false,
        groups: {entities: entities, byId: _.indexBy(entities, 'id')},
      };

    case LOAD_GROUPS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD_GROUPS, LOAD_GROUPS_SUCCESS, LOAD_GROUPS_FAIL],
    promise: (client) => client.get('/groups')
  };
}

export function create(data) {
  return {
    types: [CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL],
    promise: (client) => client.post('/groups', {
      data: data
    })
  };
}
