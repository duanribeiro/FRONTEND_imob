import React from 'react'
import { Topbar, Bottombar } from './components'
import Grid from '@material-ui/core/Grid'

export function MinimalLayout(props) {
  const { children } = props

  return (
    <>
      <Grid
      style={{"paddingTop": "38px"}}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      >
        <Grid
        item
        xs={12}
        >
          {children}
        </Grid>
      </Grid>
    </>
  )
}


export function BasicLayout(props) {
  const { children } = props

  return (
    <>
      <Topbar/>

      <Grid
      style={{"paddingTop": "38px"}}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      >
        <Grid
        item
        xs={12}
        >
          {children}
        </Grid>
      </Grid>
      <Bottombar/>
    </>
  )
}
