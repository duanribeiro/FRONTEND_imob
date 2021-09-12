import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from "../../plugins/auth";

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

    // return (
    //     <Route
    //         {...rest}
    //         render={matchProps => (
    //             isAuthenticated() ? 
    //             <Layout>
    //                 <Component {...matchProps} />
    //             </Layout> : 
    //             <Layout>
    //                 <Redirect to={{ pathname: "/login", state: { from: matchProps.location } }} />
    //             </Layout>
    //         )}
           
    //     />
    // )
}

export default PrivateRoute