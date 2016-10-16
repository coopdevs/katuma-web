import _ from 'underscore';
const LOAD = 'redux-example/invitations/LOAD';
const LOAD_SUCCESS = 'redux-example/invitations/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/invitations/LOAD_FAIL';

const SEND = 'redux-example/invitations/SEND';
const SEND_SUCCESS = 'redux-example/invitations/SEND_SUCCESS';
const SEND_FAIL = 'redux-example/invitations/SEND_FAIL';

const initialState = {
  invitations: { entities: [], byGroupId: [] },
  sendingInvitationId: null,
  sentInvitations: [],
};
export default function invitationsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        sentInvitations: [],
      };

    case LOAD_SUCCESS:
      const entities = action.result;

      return {
        ...state,
        loading: false,
        invitations: {
          entities: entities,
          byGroupId: _.groupBy(entities, 'group_id'),
        },
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
        sendingInvitationId: action.requestData.invitationId,
      };

    case SEND_SUCCESS:
      return {
        ...state,
        sendingInvitationId: null,
        sentInvitations: [
          ...state.sentInvitations,
          action.result.id,
        ],
      };

    case SEND_FAIL:
      return {
        ...state,
        sendingInvitationId: null,
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
        group_id: data.group_id,
      },
    }),
    requestData: { invitationId: data.id }
  };
}
