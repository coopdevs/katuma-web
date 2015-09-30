import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
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
const proxy = httpProxy.createProxyServer({
  target: `http://localhost:${config.apiPort}/api/v1`
});

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(require('serve-static')(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api/v1', (req, res) => {
  //req.session.user = user;
  proxy.web(req, res);
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  debugger;
  proxyReq.setHeader('X-katuma-user-id', req.session.user_id || '');
});

//
// Listen for the `proxyRes` event on `proxy`.
//
proxy.on('proxyRes', function (proxyRes, req, res) {
  var chunks = [];
  var request = req;

  if (req.session.user_id) {
    return;
  }
  // triggers on data receive
  proxyRes.on('data', function receiveChunks(chunk) {
      // add received chunk to chunks array
      chunks.push(chunk);
  });

  function proxyResponseEnd(req) {
      // make string from buffer
    var buffer = Buffer.concat(chunks);
    // output buffer
    var lol = JSON.parse(buffer.toString());
    console.log('lol', lol);
    req.session.user_id = lol.user_id;
  };
//
  // triggers on data end
  proxyRes.on('end', function () {
    proxyResponseEnd(req);
  });
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  console.log('proxy error', error);
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

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
