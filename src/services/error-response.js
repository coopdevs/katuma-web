import _ from 'underscore';

/**
 * Errors format returns a key `errors` and inside it an
 * object with an array of errors for each field.
 * We parse here that into JSON and return a Redux-form
 * compilant error object.
 *
 * @param {String} errorsResponse
 * @param {Maybe<Object>}
 */
function parseServerErrors({ errors = [] } = {}) {
  const parsedErrors = _.reduce(_.keys(errors), (memo, key) => {
    if (!_.isArray(errors[key] || !errors[key].lenght)) return memo;

    memo[key] = errors[key][0];
    return memo;
  }, {});

  if (_.isEmpty(parsedErrors)) return null;

  return parsedErrors;
}

/**
 * Errors format returns a key `errors` and inside it an
 * object with an array of errors for each field.
 * We parse here that into JSON and return a Redux-form
 * compilant error object.
 *
 * @param {String} errorsResponse
 * @param {Maybe<Object>}
 */
export default function errorResponse(body, statusCode) {
  return {
    errorMessage: parseServerErrors(body),
    statusCode,
  };
}
