import { createStore } from 'redux'
import { mapFilterReducer } from './mapFilterReducer'
import { authReducer } from './authReducer'
import { walletReducer } from './walletReducer'
import { combineReducers } from 'redux';

const reducers = combineReducers({
    mapFilters: mapFilterReducer,
    auth: authReducer,
    wallet: walletReducer,
  })

const store = createStore(reducers)

export default store