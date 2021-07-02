import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CalendarScreen from '../components/calendar/CalendarScreen';
import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute path="/auth" component={AuthRouter}  />
          <PrivateRoute path="/" component={CalendarScreen} />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter;
