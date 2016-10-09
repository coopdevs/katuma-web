import _ from 'underscore';
import errorResponse from '../../services/error-response';

const MIN_SUCCESSFUL_HTTP_CODE = 200;
const MAX_SUCCESSFUL_HTTP_CODE = 299;

/**
 * Parse response body
 *
 * @param {Number} statusCode
 * @param {Boolean}
 */
const isSuccessResponse = (statusCode) => {
  return statusCode >= MIN_SUCCESSFUL_HTTP_CODE &&
         statusCode <= MAX_SUCCESSFUL_HTTP_CODE;
};

/**
 * Parse response body
 *
 * @param {Object|String} body
 * @param {Number} statusCode
 * @param {Object}
 */
const parseBody = (body, statusCode) => {
  if (_.isObject(body)) return body;

  if (isSuccessResponse(statusCode) || statusCode === 400) {
    return _.isEmpty(body) ? {} : JSON.parse(body);
  }

  return {};
};

/**
 * Manage response based on status code
 *
 * @param {Object} body
 * @param {Number} statusCode
 * @param {Function} resolve
 * @param {Function} reject
 */
export default function handleResponse(body, statusCode, resolve, reject) {
  const parsedBody = parseBody(body, statusCode);

  if (!isSuccessResponse(statusCode)) {
    return reject(errorResponse(parsedBody, statusCode));
  }

  // Just return response
  return resolve(parsedBody);
}
