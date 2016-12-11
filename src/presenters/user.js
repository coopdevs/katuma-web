/**
 * Get all information necessary to render an avatar
 *
 * @param {String} name
 * @param {String} last_name
 * @return {String}
 */
export function getInitials(name = '', lastName = '') {
  const nameInitial = name.charAt(0).toUpperCase();
  const lastNameInitial = lastName.charAt(0).toLocaleLowerCase();

  return `${nameInitial}${lastNameInitial}`;
}

/**
 * Get all information necessary to render an avatar.
 *
 * @param {User} user
 * @return {Object}
 */
export function getAvatarInfo(user = {}) {
  const { first_name: name, last_name: lastName } = user;

  return {
    name: getInitials(name, lastName),
    isImage: false,
  };
}
