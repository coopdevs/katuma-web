import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';

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

export default function createStore(client, data) {
  const middleware = [createMiddleware(client)];
  const reducer = require('./modules/reducer');

  const store = _createStore(reducer, data, compose(
    applyMiddleware(...middleware),
    useDevtools() && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  ));

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
