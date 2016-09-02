const SIGNUP = 'redux-example/signup/SIGNUP';
const SIGNUP_SUCCESS = 'redux-example/signup/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'redux-example/signup/SIGNUP_FAIL';


const initialState = {
  signupDone: false,
  errors: null,
};

export default function signupCreateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        signupDone: false,
        errors: null,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupDone: true,
        errors: null,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        errors: action.error,
      };

    default:
      return state;
  }
}

/**
 * Restore signup state on componentWillUnmount
 *
 * @return {object}
 */
export function resetSignup() {
  return { type: SIGNUP };
}

/**
 * Create signup. Now backend sends an email confirmation to user
 *
 * @param {Object} data
 * @return {object}
 */
export function signup(data = { email: '' }) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/signups', { data })
  };
}
