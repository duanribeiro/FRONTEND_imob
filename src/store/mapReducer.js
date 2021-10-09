const initialState =  null

export const mapReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_MAP':
            return state = action.payload
        default:
            return state
    }
}