import React from 'react';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import "./styles.scss"
import api from "./../../plugins/axios";
import { save_access_token, save_refresh_token } from "./../../plugins/auth";
import {useSelector, useDispatch} from 'react-redux'

export default function CardSignIn(props) {
  const { history } = props
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()


  const [values, setValues] = React.useState({
    "username": "",
    "password": "",
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value})
  }

  const confirmSignIn = () => {
    api.post(`${process.env.REACT_APP_BACKEND_API}/auth/login`, values)
      .then(response => {
        save_access_token(response.data['access_token'])
        save_refresh_token(response.data['refresh_token'])
        history.push('/')
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
        justifyContent="center"
        alignItems="center"
        spacing={1}
        >
            <Grid item>
              <Typography variant="h2" component="h2" align="center">
                ÁREA DO USUÁRIO
              </Typography>
            </Grid>
            
            <Grid item>
              <TextField
              id="username"
              label="Email"
              helperText="Exemplo: roger@gmail.com"
              value={values["username"]}
              onChange={handleChange("username")}
              />
            </Grid>

            <Grid item>
              <TextField
              id="password"
              type="password"
              label="Senha"
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
                ENTRAR
              </Button>
            </Grid>
        </Grid>
      </Paper>
  )
}