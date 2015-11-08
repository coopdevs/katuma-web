const CHECK_INVITATION = 'redux-example/invitations/CHECK_INVITATION';
const CHECK_INVITATION_SUCCESS = 'redux-example/invitations/CHECK_INVITATION_SUCCESS';
const CHECK_INVITATION_FAIL = 'redux-example/invitations/CHECK_INVITATION_FAIL';
const COMPLETE_INVITATION = 'redux-example/invitations/COMPLETE_INVITATION';
const COMPLETE_INVITATION_SUCCESS = 'redux-example/invitations/COMPLETE_INVITATION_SUCCESS';
const COMPLETE_INVITATION_FAIL = 'redux-example/invitations/COMPLETE_INVITATION_FAIL';

const initialState = {
  validInvitation: false,
  complete: false,
  completeInvitationErrors: {}
};

export default function signupCompleteReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK_INVITATION_SUCCESS:
      return {
        ...state,
        validInvitation: true
      };

    case COMPLETE_INVITATION_SUCCESS:
      return {
        ...state,
        complete: true,
        completeInvitationErrors: {}
      };

    case COMPLETE_INVITATION_FAIL:
      const errorsKeys = Object.keys(action.error);
      // FIXME: Extract into utils. Here we're parsing API errors.
      // By default server returns an object with fields with erros.
      // And each field has an array of errors. Here we're picking
      // just first error for each field.
      const completeInvitationErrors = errorsKeys.reduce((formatedErrors, key) => {
        formatedErrors[key] = action.error[key][0];
        return formatedErrors;
      }, {});

      return {
        ...state,
        completeInvitationErrors: completeInvitationErrors
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
  return {
    types: [COMPLETE_INVITATION, COMPLETE_INVITATION_SUCCESS, COMPLETE_INVITATION_FAIL],
    promise: (client) => client.post(`/invitations/accept/${token}`, {
      data: data
    })
  };
}
