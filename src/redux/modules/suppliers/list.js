const LOAD = 'redux-example/suppliers/LOAD';
const LOAD_SUCCESS = 'redux-example/suppliers/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/suppliers/LOAD_FAIL';

const initialState = {
  suppliers: {entities: []},
};

export default function suppliersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      const entities = action.result;

      return {
        ...state,
        loading: false,
        suppliers: {
          entities: entities,
        },
      };

    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export function load(groupId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/suppliers?group_id=${groupId}`)
  };
}
