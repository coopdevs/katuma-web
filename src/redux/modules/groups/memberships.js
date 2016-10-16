import _ from 'underscore';

import parseParamsToQueryString from 'helpers/api/queryStringParser';
const LOAD = 'group/memberships/LOAD';
const LOAD_SUCCESS = 'group/memberships/LOAD_SUCCESS';
const LOAD_FAIL = 'group/memberships/LOAD_FAIL';

const initialState = {
  memberships: {
    entities: [],
    byUserID: [],
    byBasicResourceGroupId: {},
  },
};

export default function membershipsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      const entities = action.result;

      return {
        ...state,
        loading: false,
        memberships: {
          entities: entities,
          byUserID: _.indexBy(entities, 'user_id'),
          byBasicResourceGroupId: _.groupBy(entities, 'basic_resource_group_id'),
        },
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

/**
 * Load all memberships
 *
 * @param {Number} groupId
 */
export function load(groupId) {
  const params = parseParamsToQueryString({ group_id: groupId });

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/memberships${params}`)
  };
}
