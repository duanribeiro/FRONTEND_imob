import React from 'react';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import "./styles.scss"
import api from "./../../plugins/axios";
import { login } from "./../../plugins/auth";



export default function CardSignIn(props) {
  const { history } = props

  const [values, setValues] = React.useState({
    "username": "",
    "password": "",
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value})
  }

  const confirmSignIn = () => {
    api.post(`http://localhost:5000/auth/login`, values)
      .then(response => {
        login(response.data['access_token'])
        history.push('/map')
        console.log('O')
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400 || error.response.status === 401) {
              window.alert("Usuário ou senha inválida.")
            }
          if (error.response.status === 404) {
            window.alert("Página não encontrada.")
          }
        }
      })
    }

  return (
      <Paper
      elevation={3}
      className="root_signin"
      >
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
        >
            <Grid item>
              <Typography variant="h2" component="h2" align="center">
                Sign In
              </Typography>
            </Grid>
            
            <Grid item>
              <TextField
              id="username"
              label="Email"
              helperText="Example: roger@gmail.com"
              value={values["username"]}
              onChange={handleChange("username")}
              />
            </Grid>

            <Grid item>
              <TextField
              id="password"
              type="password"
              label="Password"
              value={values["password"]}
              onChange={handleChange("password")}
              />
            </Grid>

            <Grid item>
              <Button
              variant="contained"
              color="primary"
              style={{"marginTop": "30px"}}
              onClick={() => confirmSignIn()}
              >
                Sign In
              </Button>
            </Grid>
        </Grid>
      </Paper>
  )
}