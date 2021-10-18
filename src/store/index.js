import { createStore } from 'redux'
import { placesReducer } from './placesReducer'
import { walletReducer } from './walletReducer'
import { mapReducer } from './mapReducer'
import { filtersReducer } from './filtersReducer'
import { loadingReducer } from './loadingReducer'
import { districtsReducer } from './districtsReducer'
import { combineReducers } from 'redux';

const reducers = combineReducers({
    places: placesReducer,
    districts: districtsReducer,
    wallet: walletReducer,
    map: mapReducer,
    filters: filtersReducer,
    loading: loadingReducer
  })

const store = createStore(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store