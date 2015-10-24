import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

let userId;

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  const apiPath = `/api/${config.apiVersion}${adjustedPath}`;
  const apiDomain = `http://localhost:${config.apiPort}`;

  if (__SERVER__) {
    return `${apiDomain}${apiPath}`;
  }

  return apiPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {

    // Set here session to make authorized requests
    if (__SERVER__) {
      userId = req.session.user_id;
    }

    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && userId) {
          request.set('X-katuma-user-id', userId);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;

