const LOAD = 'redux-example/producers/LOAD';
const LOAD_SUCCESS = 'redux-example/producers/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/producers/LOAD_FAIL';

const initialState = {
  producers: {entities: []},
};

export default function producersReducer(state = initialState, action = {}) {
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
        producers: {
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

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/producers`)
  };
}
