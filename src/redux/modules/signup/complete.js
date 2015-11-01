const CHECK_SIGNUP = 'redux-example/signup/CHECK_SIGNUP';
const CHECK_SIGNUP_SUCCESS = 'redux-example/signup/CHECK_SIGNUP_SUCCESS';
const CHECK_SIGNUP_FAIL = 'redux-example/signup/CHECK_SIGNUP_FAIL';
const COMPLETE_SIGNUP = 'redux-example/signup/COMPLETE_SIGNUP';
const COMPLETE_SIGNUP_SUCCESS = 'redux-example/signup/COMPLETE_SIGNUP_SUCCESS';
const COMPLETE_SIGNUP_FAIL = 'redux-example/signup/COMPLETE_SIGNUP_FAIL';

const initialState = {
  validSignup: false,
  complete: false,
  completeSignupErrors: {}
};

export default function signupCompleteReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK_SIGNUP_SUCCESS:
      return {
        ...state,
        validSignup: true
      };

    case COMPLETE_SIGNUP_SUCCESS:
      return {
        ...state,
        complete: true,
        completeSignupErrors: {}
      };

    case COMPLETE_SIGNUP_FAIL:
      const errorsKeys = Object.keys(action.error);
      // FIXME: Extract into utils. Here we're parsing API errors.
      // By default server returns an object with fields with erros.
      // And each field has an array of errors. Here we're picking
      // just first error for each field.
      const completeSignupErrors = errorsKeys.reduce((formatedErrors, key) => {
        formatedErrors[key] = action.error[key][0];
        return formatedErrors;
      }, {});

      return {
        ...state,
        completeSignupErrors: completeSignupErrors
      };

    case COMPLETE_SIGNUP:
    case CHECK_SIGNUP:
    case CHECK_SIGNUP_FAIL:
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
 * @param {Object} data
 * @return {Object}
 */
export function complete(data) {
  return {
    types: [COMPLETE_SIGNUP, COMPLETE_SIGNUP_SUCCESS, COMPLETE_SIGNUP_FAIL],
    promise: (client) => client.post(`/signups/complete/${data.token}`, {
      data: data
    })
  };
}
