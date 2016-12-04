import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from './helpers/api/httpProxy';
import session from 'express-session';
import redisStore from 'connect-redis';
import path from 'path';
import createStore from './redux/create';
import ApiHttp from './helpers/api/apiHttp';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';

import { Provider } from 'react-redux';
import getRoutes from './routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const RedisStore = redisStore(session);

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
  res.json({});
});

// Proxy to API server
app.use('/api/v1', httpProxy);

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

  const client = new ApiHttp(req.session.user_id);
  const store = createStore(client);
  const history = createHistory(req.originalUrl);

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
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect
              {...renderProps}
            />
          </Provider>
        );

        res.status(200);
        global.navigator = {userAgent: req.headers['user-agent']};

        res.send(
          '<!doctype html>\n' +
          ReactDOM.renderToString(
            <Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>
          )
        );
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

const listenTo = {
  host: config.host,
  port: config.port
}

if (listenTo) {
  server.listen(listenTo, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on port %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, listenTo.port);
  });
} else {
  console.error('==>     ERROR: No NODE_PATH or NODE_PORT environment variable has been specified');
}
