const BULK = 'redux-example/invitations/BULK';
const BULK_SUCCESS = 'redux-example/invitations/BULK_SUCCESS';
const BULK_FAIL = 'redux-example/invitations/BULK_FAIL';

const initialState = {
  invitationsSent: false,
};

export default function bulkInvitationsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case BULK:
      return {
        ...state,
        invitationsSent: false,
      };
    case BULK_SUCCESS:
      return {
        ...state,
        invitationsSent: true,
      };

    case BULK_FAIL:
      return {
        ...state,
        invitationsSent: false,
        errors: action.error
      };
    default:
      return state;
  }
}

/**
 * Send bulk invitations for a group
 *
 * @param {Object} data
 * @return {Object}
 */
export function send(data) {
  return {
    types: [BULK, BULK_SUCCESS, BULK_FAIL],
    promise: (client) => client.post(`/invitations/bulk`, {
      data: {
        emails: data.emails,
        group_id: data.group_id,
      }
    })
  };
}
