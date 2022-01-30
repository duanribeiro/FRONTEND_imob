const initialState =  {
    'actives': [],
    'all': [
        'barra funda', 'perdizes', 'jardim paulista', 'pinheiros', 'itaim bibi', 'lapa', 
        'alto pinheiros', 'butantã', 'morumbi', 'jaguará', 'vila leopoldina', 'jaguaré', 'rio pequeno', 'vila sônia',
        'vila mariana', 'ipiranga', 'saúde', 'sacomã', 'vila andrade', 'santo amaro', 'campo belo',
        'jabaquara', 'capão redondo', 'socorro', 'cidade ademar','pari', 'brás', 'belém', 'mooca', 'tatuapé', 'água rasa',
        'vila prudente', 'cangaiba', 
        'penha', 'vila matilde', 'carrão', 'vila formosa', 'artur alvim', 'cidade líder','são mateus', 'vila jacuí',
        'itaquera', 'são rafael', 'josé bonifácio', 'iguatemi', 'jardim helena', 'vila curuçá', 'guaianases',
        'cidade tiradentes','bela vista', 'consolação', 'liberdade', 'santa cecília', 'cambuci', 'bom retiro', 'sé',
        'república','santana', 'vila guilherme', 'vila maria', 'casa verde', 'limão', 'freguesia do ó',
        'pirituba', 'são domingos', 'vila medeiros', 'tucuruvi', 'mandaqui', 'cachoerinha', 'brasilândia', 'jaraguá',
        'tremembé'
    ]
}

export const districtsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ACTIVE_DISTRICT':
            if (state.actives.includes(action.district)) {
                const new_houses = state.actives.filter(item => ![action.district].includes(item))
                return {...state, actives: new_houses}
            } else {
                state.actives.push(action.district)
                return {...state, actives: state.actives}
            }
        case 'RESET_DISTRICT':
            return {...state, actives: []}
        default:
            return state
}
}