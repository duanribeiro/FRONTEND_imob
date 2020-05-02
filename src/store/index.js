import { createStore } from 'redux'

const STATE =  {
    'school_filter': 0,
    'subway_station_filter': 0,
    'shopping_mall_filter': 0,
    'bank_filter': 0,
    'gas_station_filter': 0,
    'gym_filter': 0,
    'active_district': ['bela vista']
}

function filters(state=STATE, action) {

    switch (action.type) {
        case 'school_filter':
            return {...state, school_filter : state.school_filter == 0 ? 1 : 0}
        case 'subway_station_filter':
            return {...state, subway_station_filter : state.subway_station_filter == 0 ? 1 : 0}
        case 'shopping_mall_filter':
            return {...state, shopping_mall_filter : state.shopping_mall_filter == 0 ? 1 : 0}
        case 'bank_filter':
            return {...state, bank_filter : state.bank_filter == 0 ? 1 : 0}
        case 'gas_station_filter':
            return {...state, gas_station_filter : state.gas_station_filter == 0 ? 1 : 0}
        case 'gym_filter':
            return {...state, gym_filter : state.gym_filter == 0 ? 1 : 0}
        default:
            return state
    }
}

const store = createStore(filters)

export default store