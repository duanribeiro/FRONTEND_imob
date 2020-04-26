import React from 'react'
import { Route } from 'react-router-dom'

// Esse componente é importante para validarmos quais rotas poderam ser acessadas por usuários logados
const PrivateRoute = props => {
    const { layout: Layout, component: Component, ...rest } = props

   
    return (
        <Route
            {...rest}
            render={matchProps => (
                    <Layout>
                        <Component {...matchProps} />
                    </Layout>
            )}
        />
    )
}

export default PrivateRoute