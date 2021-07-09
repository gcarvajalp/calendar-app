import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';

const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/auth/login" exact={true} component={LoginScreen} />
        <Route path="/auth/register" exact={true} component={RegisterScreen} />
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
}

export default AuthRouter
