import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'express-http-proxy';
import session from 'express-session';
import RedisStore from 'connect-redis';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import getDataDependencies from './helpers/getDataDependencies';
import PrettyError from 'pretty-error';
import http from 'http';

import {ReduxRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import {reduxReactRouter, match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'query-string';
import getRoutes from './routes';
import getStatusFromRoutes from './helpers/getStatusFromRoutes';
import { load as loadAuth } from './redux/modules/auth';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const redis_store = RedisStore(session);

const proxy = httpProxy('http://localhost', {
  port: config.apiPort,
  forwardPath: function (req, res) {
    var original_path = require('url').parse(req.url).path;
    return '/api/v1' + original_path;
  },
  intercept: function (rsp, data, req, res, callback) {
    if (req.method == 'POST' && req.path == '/login' && res.statusCode == '200') {
      data = JSON.parse(data.toString('utf8'));
      req.session.user_id = data.user_id;
      data = JSON.stringify(data)
    }
    callback(null, data);
  },
  decorateRequest: function (req) {
    if (req.session.user_id) {
      req.headers['X-katuma-user-id'] = req.session.user_id;
    }
    return req;
  },
  preserveReqSession: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(require('serve-static')(path.join(__dirname, '..', 'static')));

app.use(session({
  store: new redis_store({port: 6379}),
  secret: 'katuma-to-be-changed'
}));

app.use('/api/v1/logout', (req, res) => {
  req.session.destroy();
  res.json(req.body);
});

// Proxy to API server
app.use('/api/v1', proxy);

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req, config);
  const store = createStore(reduxReactRouter, getRoutes, createHistory, client);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<div/>} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  const query = qs.stringify(req.query);
  const url = req.path + (query.length ? '?' + query : '');

  const afterAuth = () => {
    store.dispatch(match(url, (error, redirectLocation, routerState) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500);
        hydrateOnClient();
      } else if (!routerState) {
        res.status(500);
        hydrateOnClient();
      } else {
        Promise.all(getDataDependencies(
          routerState.components,
          store.getState,
          store.dispatch,
          routerState.location,
          routerState.params
        )).then(() => {
          const component = (
            <Provider store={store} key="provider">
              <ReduxRouter/>
            </Provider>
          );

          const status = getStatusFromRoutes(store.getState().router.routes);

          if (status) {
            res.status(status);
          }

          res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>)
          );

        }).catch((err) => {
          console.error('DATA FETCHING ERROR:', pretty.render(err));
          res.status(500);
          hydrateOnClient();
        });
      }
    }));
  };

  store.dispatch(loadAuth()).then(afterAuth, afterAuth);

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
