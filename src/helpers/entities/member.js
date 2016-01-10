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
export function isRole(member, role) {
  return member.role === ROLES[role];
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
