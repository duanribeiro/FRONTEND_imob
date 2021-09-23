import { createStore } from 'redux'
import { mapFilterReducer } from './mapFilterReducer'
import { authReducer } from './authReducer'
import { walletReducer } from './walletReducer'
import { mapReducer } from './mapReducer'

import { combineReducers } from 'redux';

const reducers = combineReducers({
    mapFilters: mapFilterReducer,
    auth: authReducer,
    wallet: walletReducer,
    map: mapReducer,
  })

const store = createStore(reducers)

export default store