import _ from 'underscore';

/**
 * Check if passed value is not defined and is not boolean
 *
 * @param {Any} value
 * @return {Boolean}
 */
function emptyValue(value) {
  return !value && (value !== false || value !== true);
}

/**
 * Helper method to convert a params object into URL query string.
 *
 * @param {Object} params
 * @return {String}
 */
export default function parseParamsToQueryString(params = {}) {
  const keys = _.keys(params);

  if (!keys.length) return '';

  const parsedParams = _.compact(keys.map((key) => {
    const value = params[key];

    if (emptyValue(value)) return null;

    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }));

  if (!parsedParams.length) return '';

  return `?${parsedParams.join('&')}`;
}
