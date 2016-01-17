import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'express-http-proxy';
import session from 'express-session';
import redisStore from 'connect-redis';
import path from 'path';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import AsyncProps, { loadPropsOnServer } from 'async-props';
import createHistory from 'history/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import qs from 'query-string';

import config from './config';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import getRoutes from './routes';
import asyncPropsResolver from './helpers/asyncPropsResolver';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const RedisStore = redisStore(session);

const VALID_END_POINTS_FOR_SESSION = /\/(login|signups\/complete\/|invitations\/accept)/;

/**
 * Check if API response can set session
 *
 * @param {Object} req
 * @param {Object} res
 * @return {Boolean}
 */
const canSetSession = (req, res) => {
  return req.method === 'POST' &&
        res.statusCode === 200 &&
        VALID_END_POINTS_FOR_SESSION.test(req.path);
};

const proxy = httpProxy(`http://${(process.env.HOST || 'localhost')}`, {
  port: config.apiPort,
  forwardPath: (req) => {
    const originalPath = require('url').parse(req.url).path;

    return '/api/v1' + originalPath;
  },
  intercept: (rsp, data, req, res, callback) =>{
    let respondData;
    if (canSetSession(req, res)) {
      respondData = JSON.parse(data.toString('utf8'));
      req.session.user_id = respondData.id;
      respondData = JSON.stringify(respondData);
    }
    callback(null, respondData || data);
  },
  decorateRequest: (req) => {
    if (req.session.user_id) {
      req.headers['X-katuma-user-id'] = req.session.user_id;
    }
    return req;
  },
  preserveReqSession: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use(session({
  store: new RedisStore({port: 6379}),
  secret: 'katuma-to-be-changed',
  resave: true,
  saveUninitialized: true
}));

app.use('/api/v1/logout', (req, res) => {
  req.session.destroy();
  res.json(req.body);
});

// Proxy to API server
app.use('/api/v1', proxy);

app.use((req, res, next) => {
  // Nasty bug related with this issue:
  // https://github.com/erikras/react-redux-universal-hot-example/issues/209
  // The thing is that websocket request are arriving here in development
  // it should not happen because this cause a full app repaint
  if (__DEVELOPMENT__ && /^\/sockjs-node\/.*/.test(req.originalUrl)) {
    return next();
  }

  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const history = createHistory();

  const store = createStore(getRoutes, history, client);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<div/>} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadPropsOnServer(
        {...renderProps, params: {store}},
        (err, asyncProps) => {
          const component = (
            <Provider store={store} key="provider">
              <AsyncProps {...renderProps} {...asyncProps} />
            </Provider>
          );

          res.status(200);

          global.navigator = {userAgent: req.headers['user-agent']};

          res.send('<!doctype html>\n' +
          ReactDOM.renderToString(
            <Html
              asyncProps={asyncProps}
              assets={webpackIsomorphicTools.assets()}
              component={component}
              store={store}
            />
          ));
        },
        asyncPropsResolver
      );
    } else {
      res.status(404).send('Not found');
    }
  });

});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', (process.env.HOST || 'localhost'), config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
