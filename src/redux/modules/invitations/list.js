import _ from 'underscore';
const LOAD = 'redux-example/invitations/LOAD';
const LOAD_SUCCESS = 'redux-example/invitations/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/invitations/LOAD_FAIL';

const initialState = {
  invitations: {entities: [], byGroupID: []}
};

export default function invitationsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      const entities = action.result;

      return {
        ...state,
        loading: false,
        invitations: {
          entities: entities,
          byGroupID: _.groupBy(entities, 'group_id'),
        },
      };
    case LOAD_FAIL:
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
    promise: (client) => client.get(`/invitations?group_id=${groupId}`)
  };
}
