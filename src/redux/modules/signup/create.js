const SIGNUP = 'redux-example/signup/SIGNUP';
const SIGNUP_SUCCESS = 'redux-example/signup/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'redux-example/signup/SIGNUP_FAIL';
const CLEAN_SIGNUP_ERRORS = 'redux-example/signup/CLEAN_SIGNUP_ERRORS';

const initialState = {
  errors: [],
  signup_done: false
};

export default function signupCreateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        errors: [],
        signup_done: true
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        errors: action.error.errors
      };
    case CLEAN_SIGNUP_ERRORS:
      return {
        ...state,
        errors: []
      };
    default:
      return state;
  }
}

/**
 * Create signup. Now backend sends an email confirmation to user
 *
 * @param {String} email
 * @return {object}
 */
export function signup(email) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/signups', {
      data: {
        email: email
      }
    })
  };
}

export function cleanErrors() {
  return {
    type: CLEAN_SIGNUP_ERRORS
  };
}
