import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const PublicRoute = props => {
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

export default PublicRoute
