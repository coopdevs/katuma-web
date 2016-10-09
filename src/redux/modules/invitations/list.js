import _ from 'underscore';
const LOAD = 'redux-example/invitations/LOAD';
const LOAD_SUCCESS = 'redux-example/invitations/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/invitations/LOAD_FAIL';

const SEND = 'redux-example/invitations/SEND';
const SEND_SUCCESS = 'redux-example/invitations/SEND_SUCCESS';
const SEND_FAIL = 'redux-example/invitations/SEND_FAIL';


const invitationBaseState = {
  sending: false,
  sent: false,
  failed: false,
};

const initialState = {
  invitations: {entities: [], byGroupId: []},
  invitationStatusByID: {},
};

function getInvitationState(state, invitationId, newState) {
  const invitationState = {};

  invitationState[invitationId] = {
    ...invitationBaseState,
    ...newState,
  };

  return Object.assign({}, state.invitationStatusByID, invitationState);
}

export default function invitationsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      const entities = action.result;

      const invitationStatusByID = _.reduce(_.pluck(entities, 'id'), (memo, id) => {
        memo[id] = invitationBaseState;
        return memo;
      }, {});

      return {
        ...state,
        loading: false,
        invitations: {
          entities: entities,
          byGroupId: _.groupBy(entities, 'group_id'),
        },
        invitationStatusByID,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case SEND:
      return {
        ...state,
        invitationStatusByID: getInvitationState(
          state,
          action.requestData.invitationId,
          {sending: true},
        ),
      };

    case SEND_SUCCESS:
      return {
        ...state,
        invitationStatusByID: getInvitationState(
          state,
          action.result.id,
          {sent: true},
        ),
      };

    case SEND_FAIL:
      return {
        ...state,
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

/**
 * Send individual invitation
 *
 * @param {Object} data
 * @return {Object}
 */
export function send(data) {
  return {
    types: [SEND, SEND_SUCCESS, SEND_FAIL],
    promise: (client) => client.post(`/invitations`, {
      data: {
        email: data.email,
        group_id: data.groupId,
      }
    }),
    requestData: {
      invitationId: data.id,
    }
  };
}
