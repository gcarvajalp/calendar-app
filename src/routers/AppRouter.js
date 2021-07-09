import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import CalendarScreen from '../components/calendar/CalendarScreen';
import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { startChecking } from '../actions/auth';


const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);
  console.log(checking);

  useEffect(() => {

    dispatch(startChecking());

  }, [dispatch]);


  if (checking) {
    return <h2>Espere...</h2>

  } else {
    return (
      <Router>
        <div>
          <Switch>

            <PublicRoute
              isAuthenticated={!!uid}
              path="/auth"
              component={AuthRouter} />

            <PrivateRoute
              isAuthenticated={!!uid}
              exact={true}
              path="/"
              component={CalendarScreen} />

            <Redirect
              to="/auth/login" />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default AppRouter;
