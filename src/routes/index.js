import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/login/Login';
import Home from '../pages/home/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} isPrivate={true}/>

      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={Login} />
    </Switch>
  );
}
