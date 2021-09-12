import React from 'react';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import api from "./../../plugins/axios";
import "./styles.scss"


export default function SignUpCard() {
  const [values, setValues] = React.useState({
    "email": "",
    "nickname": "",
    "hash_id": "",
    "password": "",
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value})
  }

  const confirmSignUp = () => {
    api.post(`${process.env.REACT_APP_BACKEND_API}/api/v1/authentication/`, {
      "data": values
    })
      .then(response => {
        window.alert("A cofirmation email was sent. Please check your spam box!")
      })
      .catch(error => {
        window.alert("Error on send email adrress")
        console.error(error.message)
    })
}


  return (
      <Paper
      elevation={3}
      className="root_signup"
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
                  Don't have a account? <br/> Sign up Now!
              </Typography>
            </Grid>
            
            <Grid item>
              <TextField
              id="email"
              label="Email"
              helperText="Example: roger@gmail.com"
              value={values["email"]}
              onChange={handleChange("email")}
              />
            </Grid>

            <Grid item>
              <TextField
              id="name"
              label="Temtem Nickname"
              helperText="Example: Roger"
              value={values["nickname"]}
              onChange={handleChange("nickname")}
              />
            </Grid>

            <Grid item>
              <TextField
              id="id"
              label="Temtem ID"
              helperText="Example: #533698"
              value={values["hash_id"]}
              onChange={handleChange("hash_id")}
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
              onClick={() => confirmSignUp()}
              >
                Sign Up
              </Button>
            </Grid>
        </Grid>
      </Paper>
  )
}