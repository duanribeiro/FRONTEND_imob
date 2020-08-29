import { createStore } from 'redux'

const STATE =  {
    'school_filter': 1,
    'subway_station_filter': 0,
    'shopping_mall_filter': 0,
    'bank_filter': 0,
    'gas_station_filter': 0,
    'gym_filter': 0,
    'active_districts': ['barra funda', 'perdizes', 'jardim paulista', 'pinheiros', 'itaim bibi', 'lapa', 
    'alto pinheiros', 'butantã', 'morumbi', 'jaguará', 'vila leopoldina', 'jaguaré', 'rio pequeno', 'vila sônia',
    'vila mariana', 'ipiranga', 'saúde', 'sacomã', 'vila andrade', 'santo amaro', 'campo belo',
    'jabaquara', 'capão redondo', 'socorro', 'cidade ademar','pari', 'brás', 'belém', 'mooca', 'tatuapé', 'água rasa',
    'vila prudente', 'cangaiba', 
    'penha', 'vila matilde', 'carrão', 'vila formosa', 'artur alvim', 'cidade líder','são mateus', 'vila jacuí',
    'itaquera', 'são rafael', 'josé bonifácio', 'iguatemi', 'jardim helena', 'vila curuçá', 'guaianases',
    'cidade tiradentes','bela vista', 'consolação', 'liberdade', 'santa cecília', 'cambuci', 'bom retiro', 'sé',
    'república','santana', 'vila guilherme', 'vila maria', 'casa verde', 'limão', 'freguesia do ó',
    'pirituba', 'são domingos', 'vila medeiros', 'tucuruvi', 'mandaqui', 'cachoerinha', 'brasilândia', 'jaraguá',
    'tremembé']

}

function filters(state=STATE, action) {
    switch (action.type) {
        case 'school_filter':
            return {...state, school_filter: state.school_filter == 0 ? 1 : 0}
        case 'subway_station_filter':
            return {...state, subway_station_filter: state.subway_station_filter == 0 ? 1 : 0}
        case 'shopping_mall_filter':
            return {...state, shopping_mall_filter: state.shopping_mall_filter == 0 ? 1 : 0}
        case 'bank_filter':
            return {...state, bank_filter: state.bank_filter == 0 ? 1 : 0}
        case 'gas_station_filter':
            return {...state, gas_station_filter: state.gas_station_filter == 0 ? 1 : 0}
        case 'gym_filter':
            return {...state, gym_filter: state.gym_filter == 0 ? 1 : 0}

        case 'active_district':
            // Se existir ele adiciona
            if (state.active_districts.includes(action.district)) {
                const new_active_districts = state.active_districts.filter(item => ![action.district].includes(item))
                return {...state, active_districts: new_active_districts}
                
            // Se não ele retira
            } else {
                state.active_districts.push(action.district)
                return {...state, active_districts: state.active_districts}
            }
            
        default:
            return state
    }
}

const store = createStore(filters)

export default store