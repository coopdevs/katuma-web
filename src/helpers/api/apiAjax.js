import config from '../../config';
import handleResponse from './handleResponse';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  const apiPath = `/api/${config.apiVersion}${adjustedPath}`;

  return apiPath;
}

class ApiAjax {
  constructor() {
    ['get', 'post', 'put', 'patch', 'del'].forEach((method) =>
      this[method] = (path, { data, header } = {}) => new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        const url = formatUrl(path);

        req.onload = () => {
          const { status, response } = req;
          return handleResponse(response, status, resolve, reject);
        };

        /**
         * Only covers network errors between the browser and the Express HTTP proxy
         */
        req.onerror = () => {
          reject(null);
        };

        req.open(method, url);
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/json');
        if (Object.keys(header || {}).length) {
          req.setRequestHeader(header.key, header.value);
        }
        req.send(JSON.stringify(data));
      })
    );
  }
}

export default ApiAjax;
