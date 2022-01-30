import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useSelector, useDispatch} from 'react-redux'
import Typography from '@material-ui/core/Typography';
import api from "./../../plugins/axios";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const useStyles = makeStyles({
  list: {
    width: 330,
  },
});

export default function DrawerIndicators() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const [indicators, setIndicators] = React.useState([])
  const districts = useSelector(state => state.districts)
  
  React.useEffect(() => {
    fetchIndicators()
  }, [districts])

  const fetchIndicators = () => {
      api.post(`${process.env.REACT_APP_BACKEND_API}/indicators/get_district_indicators`, {
        "districts": districts.actives
      })
      .then(response => {
        setIndicators(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  };


  const list_idicators = indicators.map((indicator) => (
    <>
      <ListSubheader>{`${indicator['district']}`}</ListSubheader>
        <ListItem key={`item-${indicator}`}>
          <ListItemText primary={`População: ${indicator['population']}`} />
        </ListItem>
        <ListItem key={`item-${indicator}`}>
          <ListItemText primary={`Renda per capita: R$${indicator['per_capita_income']} `} />
        </ListItem>
    <Divider />
    </>
    ))

  const list = () => (
    <div
      className={clsx(classes.list)}
      styles= {{"width": 250}}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Typography align="justify" variant="overline" gutterBottom component="div" style={{"padding": "20px 20px 0px 20px"}}>
        NESTA ABA TEMOS INDICADORES DA PESQUISA "ORIGEM DESTINO 2017".
      </Typography>
      
      {list_idicators}

      
    </div>
  );

 
  return (
    <div>
      <Button
        color={"green"}
        variant={"contained"}
        onClick={toggleDrawer(true)}
        style={{"fontWeight": "bold", "width": "120px"}}>
          Indicadores
        </Button> 
        <React.Fragment key='left'>
          <Drawer anchor='left' open={open} onClose={toggleDrawer(false)} BackdropProps={{ invisible: true }}>
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}