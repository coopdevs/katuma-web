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

export default (store) => {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/widgets" component={Widgets}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup-done" component={SignupSuccess}/>
      <Route component={RequireLogin} onEnter={RequireLogin.onEnter(store)}>
        <Route path="/loginSuccess" component={LoginSuccess}/>
      </Route>
      <Route path="/survey" component={Survey}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
