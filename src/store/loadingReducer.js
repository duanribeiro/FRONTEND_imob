const initialState =  false

export const loadingReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_LOADING_ON':
            return state = true
        case 'SET_LOADING_OFF':
            return state = false
        default:
            return state
    }
}