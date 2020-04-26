import React from 'react'
import { Topbar } from './components'
import Grid from '@material-ui/core/Grid'


export default function Minimal(props) {
  const { children } = props

  return (
    <>
      <Topbar/>

      <Grid
      style={{"paddingTop": "80px"}}
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
        {children}
      </Grid>
    </>
  )
}
