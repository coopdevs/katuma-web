import config from '../../config';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  const apiPath = `/api/${config.apiVersion}${adjustedPath}`;

  return apiPath;
}

class ApiAjax {
  constructor() {
    ['get', 'post', 'put', 'patch', 'del'].forEach((method) =>
      this[method] = (path, { data } = {}) => new Promise((resolve, reject) => {
        const url = formatUrl(path);
        const options = {
          method: method,
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin'
        };

        fetch(url, options)
        .then(function(response) {
          if (response.status === 401 || response.bodyUsed === false) {
            resolve(null);
            return;
          }

          response
            .json()
            .then(function(json) {
              resolve(json);
            })
            .catch(function(err) {
              reject(err);
            });
        })
        .catch(function(err) {
          reject(err);
        });
      })
    );
  }
}

export default ApiAjax;
