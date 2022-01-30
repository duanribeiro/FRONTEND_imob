const initialState =  {
    'user': null,
    'rent_houses': false,
    'school_filter': false,
    'police_station_filter': false,
    'subway_station_filter': false,
    'shopping_mall_filter': false,
    'bank_filter': false,
    'gas_station_filter': false,
    'gym_filter': false,
    // 'active_districts': []
    // [
    //     'barra funda', 'perdizes', 'jardim paulista', 'pinheiros', 'itaim bibi', 'lapa', 
    //     'alto pinheiros', 'butantã', 'morumbi', 'jaguará', 'vila leopoldina', 'jaguaré', 'rio pequeno', 'vila sônia',
    //     'vila mariana', 'ipiranga', 'saúde', 'sacomã', 'vila andrade', 'santo amaro', 'campo belo',
    //     'jabaquara', 'capão redondo', 'socorro', 'cidade ademar','pari', 'brás', 'belém', 'mooca', 'tatuapé', 'água rasa',
    //     'vila prudente', 'cangaiba', 
    //     'penha', 'vila matilde', 'carrão', 'vila formosa', 'artur alvim', 'cidade líder','são mateus', 'vila jacuí',
    //     'itaquera', 'são rafael', 'josé bonifácio', 'iguatemi', 'jardim helena', 'vila curuçá', 'guaianases',
    //     'cidade tiradentes','bela vista', 'consolação', 'liberdade', 'santa cecília', 'cambuci', 'bom retiro', 'sé',
    //     'república','santana', 'vila guilherme', 'vila maria', 'casa verde', 'limão', 'freguesia do ó',
    //     'pirituba', 'são domingos', 'vila medeiros', 'tucuruvi', 'mandaqui', 'cachoerinha', 'brasilândia', 'jaraguá',
    //     'tremembé']

}
export const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'rent_houses':
            return {...state, rent_houses: !state.rent_houses}
        case 'school_filter':
            return {...state, school_filter: !state.school_filter}
        case 'police_station_filter':
            return {...state, police_station_filter: !state.police_station_filter}
        case 'subway_station_filter':
            return {...state, subway_station_filter: !state.subway_station_filter}
        case 'shopping_mall_filter':
            return {...state, shopping_mall_filter: !state.shopping_mall_filter}
        case 'bank_filter':
            return {...state, bank_filter: !state.bank_filter ? true : false}
        case 'gas_station_filter':
            return {...state, gas_station_filter: !state.gas_station_filter}
        case 'gym_filter':
            return {...state, gym_filter: !state.gym_filter}

        // case 'ACTIVE_DISTRICT':
        //     // Se existir ele adiciona
        //     if (state.active_districts.includes(action.district)) {
        //         const new_active_districts = state.active_districts.filter(item => ![action.district].includes(item))
        //         return {...state, active_districts: new_active_districts}
                
        //     // Se não ele retira
        //     } else {
        //         state.active_districts.push(action.district)
        //         return {...state, active_districts: state.active_districts}
        //     }
            
        default:
            return state
}
}