import { createStore } from 'redux'
import { placesReducer } from './placesReducer'
import { walletReducer } from './walletReducer'
import { mapReducer } from './mapReducer'
import { filtersReducer } from './filtersReducer'
import { loadingReducer } from './loadingReducer'
import { combineReducers } from 'redux';

const reducers = combineReducers({
    places: placesReducer,
    wallet: walletReducer,
    map: mapReducer,
    filters: filtersReducer,
    loading: loadingReducer
  })

const store = createStore(reducers)

export default store