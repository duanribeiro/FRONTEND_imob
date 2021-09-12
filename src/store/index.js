import { createStore } from 'redux'
import { mapFilterReducer } from './mapFilterReducer'
import { authReducer } from './authReducer'

import { combineReducers } from 'redux';

const reducers = combineReducers({
    mapFilters: mapFilterReducer,
    auth: authReducer,
  })

const store = createStore(reducers)

export default store