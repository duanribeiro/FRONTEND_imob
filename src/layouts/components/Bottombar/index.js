import React from 'react'
import Grid from '@material-ui/core/Grid'
import "./styles.scss"
import Typography from '@material-ui/core/Typography';

export default function Bottombar(props) {
  const Mailto = ({ email, subject, body, children }) => {
    return (
      <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
    );
  };

  return (
    <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography align="justify" variant="overline" gutterBottom component="div" style={{"padding": "5px 0px 0px 0px"}}>
            Contato através de &nbsp;<Mailto email="DUAN.RIBEIRO@HOTMAIL.COM" subject="Contato de usuário RADAR IMOVEL" body="">
               duan.ribeiro@hotmail.com
            </Mailto>
          </Typography>
        </Grid>
    </>
  )
}
