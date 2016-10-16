const CHECK_INVITATION = 'redux-example/invitations/CHECK_INVITATION';
const CHECK_INVITATION_SUCCESS = 'redux-example/invitations/CHECK_INVITATION_SUCCESS';
const CHECK_INVITATION_FAIL = 'redux-example/invitations/CHECK_INVITATION_FAIL';
const COMPLETE_INVITATION = 'redux-example/invitations/COMPLETE_INVITATION';
export const COMPLETE_INVITATION_SUCCESS = 'redux-example/invitations/COMPLETE_INVITATION_SUCCESS';
const COMPLETE_INVITATION_FAIL = 'redux-example/invitations/COMPLETE_INVITATION_FAIL';

const initialState = {
  validInvitation: false,
  invitationDone: false,
  error: null,
};

export default function invitationCompleteReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK_INVITATION_SUCCESS:
      return {
        ...state,
        validInvitation: true
      };

    case COMPLETE_INVITATION_SUCCESS:
      return {
        ...state,
        invitationDone: true,
        errors: null,
      };

    case COMPLETE_INVITATION_FAIL:
      return {
        ...state,
        errors: action.error,
      };

    case COMPLETE_INVITATION:
    case CHECK_INVITATION:
    case CHECK_INVITATION_FAIL:
    default:
      return state;
  }
}

/**
 * Check in database via API call if invitations exists
 *
 * @param {String} token
 * @return {object}
 */
export function checkInvitation(token) {
  return {
    types: [CHECK_INVITATION, CHECK_INVITATION_SUCCESS, CHECK_INVITATION_FAIL],
    promise: (client) => client.get(`/invitations/${token}`, {
      data: {
        token: token
      }
    })
  };
}

/**
 * Complete invitations
 *
 * @param {String} token
 * @param {Object} data
 * @return {Object}
 */
export function complete(token, data) {
  // If password_confirmation is empty we need to send
  // an empty string to validate password_confirmation if password present
  if (data.password && !data.password_confirmation) {
    data.password_confirmation = '';
  }
  return {
    types: [COMPLETE_INVITATION, COMPLETE_INVITATION_SUCCESS, COMPLETE_INVITATION_FAIL],
    promise: (client) => client.post(`/invitations/accept/${token}`, {
      data: data
    })
  };
}
