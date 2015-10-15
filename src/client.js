/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';

import getRoutes from './routes';
import getRoutesWithoutHooks from './helpers/getRoutesWithoutHooks';

const client = new ApiClient();

const dest = document.getElementById('content');
const store = createStore(reduxReactRouter, getRoutesWithoutHooks(getRoutes), createHistory, client, window.__data);

const component = (
  <Provider store={store} key="provider">
    <ReduxRouter routes={getRoutes(store)} />
  </Provider>
);

ReactDOM.render(component, dest);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__) {
  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
  ReactDOM.render(<div>
    {component}
    <DebugPanel top right bottom key="debugPanel">
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
  </div>, dest);
}
