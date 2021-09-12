const initialState =  {
    '_id': null,
    'username': null,
    'token': null,
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, _id: action.payload['_id'], username: action.payload['username']}
        case 'LOGOFF':
            return {...state, _id: null, username: null}
        default:
            return state
}
}