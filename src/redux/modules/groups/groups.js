import _ from 'underscore';

const LOAD_GROUPS = 'redux-example/groups/LOAD_GROUPS';
const LOAD_GROUPS_SUCCESS = 'redux-example/groups/LOAD_GROUPS_SUCCESS';
const LOAD_GROUPS_FAIL = 'redux-example/groups/LOAD_GROUPS_FAIL';
const LOAD_GROUP = 'redux-example/groups/LOAD_GROUP';
const LOAD_GROUP_SUCCESS = 'redux-example/groups/LOAD_GROUP_SUCCESS';
const LOAD_GROUP_FAIL = 'redux-example/groups/LOAD_GROUP_FAIL';
const CREATE_GROUP = 'redux-example/groups/CREATE_GROUP';
const CREATE_GROUP_SUCCESS = 'redux-example/groups/CREATE_GROUP_SUCCESS';
const CREATE_GROUP_FAIL = 'redux-example/groups/CREATE_GROUP_FAIL';

import mergeResponse from 'redux/lib/merge';

const initialState = {
  groups: { entities: [], byId: {} },
  createdGroupId: null,
  errors: null,
};

export default function groupsReducer(state = initialState, action = {}) {
  let entities;

  switch (action.type) {
    case CREATE_GROUP:
      return {
        createdGroupId: null,
        ...state,
      };

    case CREATE_GROUP_SUCCESS:
      entities = [...state.groups.entities, action.result];

      return {
        ...state,
        groups: {
          entities,
          byId: _.indexBy(entities, 'id'),
        },
        createdGroupId: action.result.id,
        errors: null,
      };

    case CREATE_GROUP_FAIL:
      return {
        ...state,
        createdGroupId: null,
        errors: action.error,
      };

    case LOAD_GROUPS:
      return {
        ...state,
        loading: true
      };

    case LOAD_GROUPS_SUCCESS:
      entities = mergeResponse(state.groups.entities, action.result);

      return {
        ...state,
        groups: {
          entities,
          byId: _.indexBy(entities, 'id'),
        },
        loading: false,
      };

    case LOAD_GROUPS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case LOAD_GROUP:
      return {
        ...state,
        loading: true
      };

    case LOAD_GROUP_SUCCESS:
      entities = mergeResponse(state.groups.entities, action.result);

      return {
        ...state,
        groups: {
          entities,
          byId: _.indexBy(entities, 'id'),
        },
        loading: false,
      };

    case LOAD_GROUP_FAIL:
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

export function loadGroup(id) {
  return {
    types: [LOAD_GROUP, LOAD_GROUP_SUCCESS, LOAD_GROUP_FAIL],
    promise: (client) => client.get(`/groups/${id}`)
  };
}

export function create(data) {
  return {
    types: [CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL],
    promise: (client) => client.post('/groups', { data }),
  };
}
