import React from 'react' 
import { Switch, Redirect } from 'react-router-dom' 
import {MinimalLayout, BasicLayout} from '../layouts' 
import PublicRoute from './PublicRoute' 
import PrivateRoute from './PrivateRoute' 
import { MainView, StatisticsView, AuthenticationView, DemoView } from '../views' 


const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        path="/"
        to="/login"
      />
      <PublicRoute
        exact
        path="/login"
        layout={MinimalLayout}
        component={AuthenticationView}
      />
      <PrivateRoute
        exact
        path="/map"
        layout={BasicLayout}
        component={MainView}
      />
      <PrivateRoute
        exact
        path="/statistics"
        layout={BasicLayout}
        component={StatisticsView}
      />
      <Redirect to={{ pathname: "/login"}} />
    </Switch>
  ) 
} 

export default Routes 
