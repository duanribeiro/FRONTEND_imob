import React from 'react'
import { AppBar } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import "./styles.scss"

export default function Topbar(props) {

  return (
    <>
      <AppBar id="topbar">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Link to='/map'>
              <Button color="inherit">Mapa</Button>
            </Link>
          </Grid>
          <Grid item>
            <Link to='/statistics'>
              <Button color="inherit">Estatísticas</Button>
            </Link>
          </Grid>
        </Grid>
      </AppBar>
    </>
  )
}
