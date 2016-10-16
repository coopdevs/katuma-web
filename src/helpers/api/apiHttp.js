import request from 'request';

import config from '../../config';
import handleResponse from './handleResponse';

/**
 * Returns API base URL
 *
 * @return {String}
 */
const baseUrl = () => {
  if (config.apiSocketPath) {
    return `unix:${config.apiSocketPath}:`;
  }

  return `${config.apiHost}:${config.apiPort}`;
}

/**
 * Returns complete API URL
 *
 * @param {String} path
 * @return {String}
 */
const completeUrl = (path) => {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  const apiPath = `/api/${config.apiVersion}${adjustedPath}`;

  return `http://${baseUrl()}${apiPath}`;
}

class _ApiHttp {
  constructor(userId) {
    ['get', 'post', 'put', 'patch', 'delete'].forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const req = request[method];
        const options = {
          url: completeUrl(path),
          headers: {
            'X-katuma-user-id': userId || ''
          },
          body: data,
          qs: params,
          json: true
        };

        req(options, (error, response, body) => {
          const { statusCode } = response;

          if (error) {
            return reject(error);
          } else if (statusCode === 401) {
            return resolve(null);
          }

          return handleResponse(body, statusCode, resolve, reject);
        });
      });
    });
  }
}

// This is just ridiculous:
// http://discuss.babeljs.io/t/referenceerror-apiclient-is-not-defined/51
const ApiHttp = _ApiHttp;

export default ApiHttp;
