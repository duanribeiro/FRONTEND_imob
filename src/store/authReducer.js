const initialState =  {
    'user_id': null,
    'username': null,
    'access_token': null,    'refresh_token': null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':            
            return state = action.payload
        case 'LOGOFF':
            return {...state, _id: null, username: null}
        default:
            return state
    }
}