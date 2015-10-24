/* eslint no-unused-vars: 0 */
const CHECK_SIGNUP = 'redux-example/signup/CHECK_SIGNUP';
const CHECK_SIGNUP_SUCCESS = 'redux-example/signup/CHECK_SIGNUP_SUCCESS';
const CHECK_SIGNUP_FAIL = 'redux-example/signup/CHECK_SIGNUP_FAIL';

const initialState = {
  validSignup: false
};

export const COMPLETE_SIGNUP_FORM_FIELDS = {
  username: {
    type: 'text',
    label: 'Nombre de usuario',
    placeholder: 'Elige un nombre de usuario. Ej.: roberto_perez'
  },
  first_name: {
    type: 'text',
    label: 'Nombre',
    placeholder: 'Tu nombre'
  },
  last_name: {
    type: 'text',
    label: 'Apellido',
    placeholder: 'Tu primer apellido'
  },
  password: {
    type: 'text',
    label: 'Contraseña',
    placeholder: 'Elige una contraseña'
  },
  password_confirmation: {
    type: 'text',
    label: 'Confirmacion de Contraseña',
    placeholder: 'Repite la misma contraseña'
  },
};

export default function signupCompleteReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECK_SIGNUP_SUCCESS:
      return {
        ...state,
        validSignup: true
      };

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
