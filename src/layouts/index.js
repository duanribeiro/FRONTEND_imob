import React from 'react'
import { Topbar, Sidebar } from './components'

import Grid from '@material-ui/core/Grid'


export default function Minimal(props) {
  const { children } = props

  return (
    <>
      <Topbar/>

      <Grid
      style={{"paddingTop": "38px"}}
      container
      direction="row"
      justify="center"
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
