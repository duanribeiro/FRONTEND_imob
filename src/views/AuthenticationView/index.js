import React from 'react'
import Grid from '@material-ui/core/Grid'
import CardSignUp from "./../../components/CardSignUp"
import CardSignIn from "./../../components/CardSignIn"

import "./styles.scss"


export default function AuthenticationView(props) {
    return (
        <>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <CardSignIn/>
                </Grid>      
            </Grid>
        </>
    )
}