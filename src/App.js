import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import "./App.scss"
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import Routes from './Routes'

const browserHistory = createBrowserHistory()

function App() {
  return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes/>
          </Router>
        </ThemeProvider>
      </Provider>
  )
}

export default App