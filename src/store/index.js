import { createStore } from 'redux'
import { placesReducer } from './placesReducer'
import { authReducer } from './authReducer'
import { walletReducer } from './walletReducer'
import { mapReducer } from './mapReducer'
import { filtersReducer } from './filtersReducer'


import { combineReducers } from 'redux';

const reducers = combineReducers({
    places: placesReducer,
    auth: authReducer,
    wallet: walletReducer,
    map: mapReducer,
    filters: filtersReducer
  })

const store = createStore(reducers)

export default store