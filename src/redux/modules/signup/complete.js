const CHECK_SIGNUP = 'redux-example/signup/CHECK_SIGNUP';
const CHECK_SIGNUP_SUCCESS = 'redux-example/signup/CHECK_SIGNUP_SUCCESS';
const CHECK_SIGNUP_FAIL = 'redux-example/signup/CHECK_SIGNUP_FAIL';

const initialState = {
  errors: [],
  signup_done: false
};

export default function signupCompleteReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK_SIGNUP:
      return {
        ...state
      };
    case CHECK_SIGNUP_SUCCESS:
      return {
        ...state,
        email: action.email
      };
    case CHECK_SIGNUP_FAIL:
      return {
        ...state,
        errors: action.error.errors
      };
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
    types: [CHECK_SIGNUP_SUCCESS, CHECK_SIGNUP_FAIL],
    promise: (client) => client.get(`/signups/${token}`, {
      data: {
        token: token
      }
    })
  };
}
