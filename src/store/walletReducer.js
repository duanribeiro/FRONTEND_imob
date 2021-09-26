const initialState =  {
    'houses': [],
}

export const walletReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_HOUSES':
            return {...state, houses: action.payload}

        case 'ADD_HOUSE':
            return {...state, houses: [...state.houses, action.payload]}
            
        case 'REMOVE_HOUSE':
            return {...state, houses: state.houses.filter(house => house['_id'] !== action.payload['_id']),}
       
        default:
            return state
    }
}