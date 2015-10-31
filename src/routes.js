/* eslint no-debugger: 0 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Widgets,
    Login,
    Signup,
    SignupComplete,
    GroupsBase,
    Survey,
    NotFound,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="widgets" component={Widgets}/>
      <Route path="login" component={Login}/>

      {/* Routes signup */}
      <Route path="signup">
        <IndexRoute component={Signup}/>
        <Route path="complete" context={store} onEnter={SignupComplete.onEnter}>
          <Route path=":token" component={SignupComplete}/>
        </Route>
      </Route>

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="groups" component={GroupsBase}/>
      </Route>

      <Route path="/survey" component={Survey}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
