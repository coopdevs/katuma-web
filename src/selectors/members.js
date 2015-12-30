import _ from 'underscore';
import { createSelector } from 'reselect';

function selectMembersWithUser(members, users) {
  const entities = _.map(members.byUserID, (member) => {
    const userById = users.byID[member.user_id];
    const user = _.omit(userById, ['created_at', 'updated_at', 'id']);

    return {
      ...user,
      ...member,
    };
  });

  return {
    entities: entities,
    byGroupID: _.groupBy(entities, 'group_id'),
  };
}

const membersSelector = (state) => state.membershipsReducer.memberships;
const usersSelector = (state) => state.usersReducer.users;

export const membersWithUserSelector = createSelector(
  [membersSelector, usersSelector],
  (members, users) => {
    return {
      members: selectMembersWithUser(members, users),
    };
  }
);
