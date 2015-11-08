const BULK = 'redux-example/invitations/BULK';
const BULK_SUCCESS = 'redux-example/invitations/BULK_SUCCESS';
const BULK_FAIL = 'redux-example/invitations/BULK_FAIL';

const initialState = {
  bulkErrors: {},
  isSubmiting: false,
};

export default function bulkInvitationsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case BULK:
      return {
        ...state,
        isSubmiting: true,
      };
    case BULK_SUCCESS:
      return {
        ...state,
        isSubmiting: false,
        bulkErrors: {},
      };

    case BULK_FAIL:
      return {
        ...state,
        isSubmiting: false,
        bulkErrors: action.error.errors
      };
    default:
      return state;
  }
}

/**
 * Send bulk invitations for a group
 *
 * @param {Object} data
 * @return {Object}
 */
export function send(data) {
  return {
    types: [BULK, BULK_SUCCESS, BULK_FAIL],
    promise: (client) => client.post(`/invitations/bulk`, {
      data: {
        emails: data.emails,
        group_id: data.group_id,
      }
    })
  };
}
