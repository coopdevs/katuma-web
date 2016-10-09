const CHECK_SIGNUP = 'redux-example/signup/CHECK_SIGNUP';
const CHECK_SIGNUP_SUCCESS = 'redux-example/signup/CHECK_SIGNUP_SUCCESS';
const CHECK_SIGNUP_FAIL = 'redux-example/signup/CHECK_SIGNUP_FAIL';
const COMPLETE_SIGNUP = 'redux-example/signup/COMPLETE_SIGNUP';
export const COMPLETE_SIGNUP_SUCCESS = 'redux-example/signup/COMPLETE_SIGNUP_SUCCESS';
const COMPLETE_SIGNUP_FAIL = 'redux-example/signup/COMPLETE_SIGNUP_FAIL';

const initialState = {
  validSignup: false,
  signupDone: false,
  errors: null,
};

export default function signupCompleteReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK_SIGNUP:
    case CHECK_SIGNUP_FAIL:
      return {
        ...state,
        validSignup: false
      };
    case CHECK_SIGNUP_SUCCESS:
      return {
        ...state,
        validSignup: true
      };

    case COMPLETE_SIGNUP_SUCCESS:
      return {
        ...state,
        signupDone: true,
        errors: null,
      };

    case COMPLETE_SIGNUP_FAIL:
      return {
        ...state,
        errors: action.error,
      };

    case COMPLETE_SIGNUP:
    default:
      return state;
  }
}

/**
 * Check in database via API call if signup exists
 *
 * @param {String} token
 * @return {object}
 */
export function checkSignup(token) {
  return {
    types: [CHECK_SIGNUP, CHECK_SIGNUP_SUCCESS, CHECK_SIGNUP_FAIL],
    promise: (client) => client.get(`/signups/${token}`, {
      data: {
        token: token
      }
    })
  };
}

/**
 * Complete signup
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
    types: [COMPLETE_SIGNUP, COMPLETE_SIGNUP_SUCCESS, COMPLETE_SIGNUP_FAIL],
    promise: (client) => client.post(`/signups/complete/${token}`, {
      data: data
    })
  };
}
