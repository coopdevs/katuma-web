const CREATE_GROUP = 'redux-example/groups/CREATE_GROUP';
const CREATE_GROUP_SUCCESS = 'redux-example/groups/CREATE_GROUP_SUCCESS';
const CREATE_GROUP_FAIL = 'redux-example/groups/CREATE_GROUP_FAIL';

const initialState = {
  createGroupErrors: {},
  groups: [],
};

export default function membershipsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
      };

    case CREATE_GROUP_SUCCESS:
      const groups = state.groups;

      groups.push(action.result);

      return {
        ...state,
        groups: groups,
        createGroupErrors: {}
      };

    case CREATE_GROUP_FAIL:
      const errorsKeys = Object.keys(action.error);
      // FIXME: Extract into utils. Here we're parsing API errors.
      // By default server returns an object with fields with erros.
      // And each field has an array of errors. Here we're picking
      // just first error for each field.
      const createGroupErrors = errorsKeys.reduce((formatedErrors, key) => {
        formatedErrors[key] = action.error[key][0];
        return formatedErrors;
      }, {});

      return {
        ...state,
        createGroupErrors: createGroupErrors
      };

    default:
      return state;
  }
}

export function create(data) {
  return {
    types: [CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL],
    promise: (client) => client.post('/groups', {
      data: data
    })
  };
}
