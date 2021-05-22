import React from 'react' 
import { Switch } from 'react-router-dom' 
import Minimal from './layouts' 
import PublicRoute from './layouts/components/PublicRoute' 
import { MainView, StatisticsView, RealEstateFundsView } from './views' 


const Routes = () => {
  
  return (
    <Switch>
      {/* Rotas Públicas */}
      <PublicRoute
        exact
        path="/"
        layout={Minimal}
        component={MainView}
      />
      <PublicRoute
        exact
        path="/statistics"
        layout={Minimal}
        component={StatisticsView}
      />
    </Switch>
  ) 
} 

export default Routes 
