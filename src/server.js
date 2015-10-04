import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'express-http-proxy';
import session from 'express-session';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import universalRouter from './helpers/universalRouter';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy('http://localhost', {
  port: config.apiPort,
  forwardPath: function(req, res) {
    var original_path = require('url').parse(req.url).path;
    return '/api/v1' + original_path;
  },
  intercept: function(rsp, data, req, res, callback) {
    data = JSON.parse(data.toString('utf8'));
    req.session.user_id = data.user_id;
    callback(null, JSON.stringify(data));
  }
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(require('serve-static')(path.join(__dirname, '..', 'static')));

app.use(session({
  secret: 'katuma-to-be-changed'
}));

// Proxy to API server
app.use('/api/v1', proxy);

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const store = createStore(client);
  const location = createLocation(req.path, req.query);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<div/>} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  universalRouter(location, undefined, store, true)
    .then(({component, redirectLocation}) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
        return;
      }
      res.send('<!doctype html>\n' +
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
    })
    .catch((error) => {
      if (error.redirect) {
        res.redirect(error.redirect);
        return;
      }
      console.error('ROUTER ERROR:', pretty.render(error));
      hydrateOnClient(); // let client render error page or re-request data
    });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.name, config.apiPort);
    console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
