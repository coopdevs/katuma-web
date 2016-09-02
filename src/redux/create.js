import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { syncHistory } from 'react-router-redux';

/**
 * Check if we can use devtools.
 *
 * @return {Boolean}
 */
function useDevtools() {
  return (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') &&
    __DEVELOPMENT__ &&
    __CLIENT__ &&
    __DEVTOOLS__;
}

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware];
  const reducer = require('./modules/reducer');

  const store = _createStore(reducer, data, compose(
    applyMiddleware(...middleware),
    useDevtools() && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  ));

  reduxRouterMiddleware.listenForReplays(store);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
