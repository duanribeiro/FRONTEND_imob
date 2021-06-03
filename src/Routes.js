import React from 'react' 
import { Switch, Redirect } from 'react-router-dom' 
import Minimal from './layouts' 
import PublicRoute from './layouts/components/PublicRoute' 
import PrivateRoute from './layouts/components/PrivateRoute' 
import { MainView, StatisticsView, AuthenticationView } from './views' 



const Routes = () => {
  
  return (
    <Switch>
      {/* Rotas Públicas */}
      <PublicRoute
        exact
        path="/login"
        layout={Minimal}
        component={AuthenticationView}
      />
      <PrivateRoute
        exact
        path="/statistics"
        layout={Minimal}
        component={StatisticsView}
      />
      <PrivateRoute
        exact
        path="/map"
        layout={Minimal}
        component={MainView}
      />
      <Redirect to={{ pathname: "/login"}} />
    </Switch>
  ) 
} 

export default Routes 
