import _ from 'underscore';

const ROLES = {
  admin: 1,
  member: 2,
};

const ROLES_BY_VALUE = _.invert(ROLES);

/**
 * Return true if member is the passed role
 *
 * @param {Member} member
 * @param {String} role
 * @returns {Boolean}
 */
export function isRole(user, role) {
  return user.role === ROLES[role];
}

/**
 * Return role of member
 * TODO: i18n this
 *
 * @param {Member} member
 * @returns {String}
 */
export function getRole(member) {
  return ROLES_BY_VALUE[member.role];
}

/**
 * Return user decorated with membership
 *
 * @param {Object} user
 * @param {Object} membership
 * @returns {Object}
 */
export function getMember(user, membership) {
  return {
    ...user,
    role: membership.role,
  };
}
