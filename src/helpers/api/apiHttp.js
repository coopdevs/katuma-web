import config from '../../config';
import request from 'request';

/**
 * Returns API base URL
 *
 * @return {String}
 */
const baseUrl = () => {
  if (config.apiSocketPath) {
    return `unix:${config.apiSocketPath}:`;
  }

  return `localhost:${config.apiPort}`;
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

class ApiHttp {
  constructor(userId) {
    ['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {

        const req = request[method];
        const options = {
          url: completeUrl(path),
          headers: {
            'X-katuma-user-id': userId || ''
          },
          body: data,
          json: true
        };

        req(options, (error, response, body) => {
          if (error) {
            reject(error);
          } else if (response.statusCode === 401) {
            resolve(null);
          }

          resolve(body);
        });
      });
    });
  }
}

export default ApiHttp;
