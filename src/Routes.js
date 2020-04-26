import React from 'react' 
import { Switch } from 'react-router-dom' 
import Minimal from './layouts' 
import PublicRoute from './layouts/components/PublicRoute' 
import { MainView } from './views' 


const Routes = () => {
  
  return (
    <Switch>
      {/* Rotas Públicas */}
      <PublicRoute
      exact
      path="/"
      component={MainView}
      layout={Minimal}
      />
    </Switch>
  ) 
} 

export default Routes 
