const initialState =  {
    'slider_dates': [4, 7],
    'slider_rent_prices': [1000, 5000],
    'slider_sell_prices': [1000000, 5000000],
    'checked': [false, false, false, false, false],
}

export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_SLIDER_DATES':            
            return {...state, slider_dates: action.payload}
        case 'CHANGE_SLIDER_RENT_PRICES':            
            return {...state, slider_rent_prices: action.payload}
        case 'CHANGE_SLIDER_SELL_PRICES':            
            return {...state, slider_sell_prices: action.payload}
        case 'UPDATE_CHECKBOX':            
            return {...state, checked: action.payload}
        default:
            return state
    }
}