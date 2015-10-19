/* eslint no-debugger: 0 */

import superagent from 'superagent';

let userId;

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class ApiClient_ {
  constructor(req, config) {

    if (__SERVER__) {
      userId = req.session.user_id;
    }

    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            const request = superagent[method](this.formatUrl(path, config));
            if (options && options.params) {
              request.query(options.params);
            }

            if (__SERVER__ && userId) {
              request.set('X-katuma-user-id', userId);
            }

            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {
              if (err) {
                reject((res && res.body) || err);
              } else {
                resolve(res.body);
              }
            });
          });
        };
      });
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(path, config) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (__SERVER__) {
       // Prepend host and port of the API server to the path.
      return 'http://localhost:' + config.apiPort + '/api/v1' + adjustedPath;
    }
    // Prepend `/api` to relative URL, to proxy to API server.
    return '/api/v1' + adjustedPath;
  }
}
const ApiClient = ApiClient_;

export default ApiClient;
