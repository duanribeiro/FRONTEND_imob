import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import "./styles.scss"

export default function Topbar(props) {

  return (
    <>
      <AppBar>
        <Grid item>
          <Link to='/'>
            <Button color="inherit">Home</Button>
          </Link>
        </Grid>
      </AppBar>
    </>
  )
}
