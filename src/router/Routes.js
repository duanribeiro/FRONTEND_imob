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
        to="/map"
      />
      <PublicRoute
        exact
        path="/login"
        layout={BasicLayout}
        component={AuthenticationView}
      />
      <PublicRoute
        exact
        path="/map"
        layout={BasicLayout}
        component={MainView}
      />
      <PublicRoute
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
