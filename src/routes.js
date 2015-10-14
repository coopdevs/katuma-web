import React from 'react';
import {Route} from 'react-router';
import {
    App,
    Home,
    Widgets,
    Login,
    Signup,
    SignupSuccess,
    RequireLogin,
    LoginSuccess,
    Survey,
    NotFound,
  } from 'containers';

export default function(history) {
  return (
    <Route component={App} history={history}>
      <Route path="/" component={Home}/>
      <Route path="/widgets" component={Widgets}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/signup-done" component={SignupSuccess}/>
      <Route component={RequireLogin} context={store} onEnter={RequireLogin.onEnter}>
        <Route path="/loginSuccess" component={LoginSuccess}/>
      </Route>
      <Route path="/survey" component={Survey}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
