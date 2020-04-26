import { createStore } from 'redux'

const INITIAL_STATE =  {
    'life': 3,
    'time': Date.now() + 100000
}

function courses(state=INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADD_LIFE':
            return {...state, life : state.life + Number(action.size)}
        case 'REMOVE_LIFE':
            return {...state, life : state.life - Number(action.size)}
        case 'ADD_TIME':
            return {...state, time : Date.now() - (Number(action.size) * 1000)}
        case 'REMOVE_TIME':
            return {...state, time : Date.now() - (Number(action.size) * 1000)}
        default:
            return state
    }
}

const store = createStore(courses)

export default store