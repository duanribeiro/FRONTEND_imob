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


const useStyles = makeStyles({
  list: {
    width: 330,
  },
});

export default function DrawerPlaces() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  
  const dispatch = useDispatch()


  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  };

  const places = useSelector(state => state.places)
  const districts = useSelector(state => state.districts)

  const list = () => (
    <div
      className={clsx(classes.list)}
      styles= {{"width": 250}}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Typography align="justify" variant="overline" gutterBottom component="div" style={{"padding": "20px 20px 0px 20px"}}>
        NESTA ABA DESCOBRIMOS OS PONTOS DE INTERESSE NOS BAIRROS ATIVOS.
      </Typography>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Categorias
          </ListSubheader>
        }
        className={classes.root}
      >
          {/* <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={places.rent_houses ? true : false}
              onClick={() => dispatch({ type: "rent_houses"})}
              name="rent_houses"/>
              }
            label="Casas em Aluguel"
            />
          </ListItemIcon>
          <br/> */}

          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={places.police_station_filter ? true : false}
              onClick={() => dispatch({ type: "police_station_filter"})}
              name="police_station_filter"/>
              }
            label="Delegacias"
            />
          </ListItemIcon>
          <br/>

          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={places.subway_station_filter ? true : false}
              onClick={() => dispatch({ type: "subway_station_filter"})}
              name="subway_station_filter"/>
              }
            label="Metrôs"
            />
          </ListItemIcon>
          <br/>

          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={places.school_filter ? true : false}
              onClick={() => dispatch({ type: "school_filter"})}
              name="school_filter"/>
              }
            label="Escolas"
            />
          </ListItemIcon>
          <br/>
        
          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={places.shopping_mall_filter ? true : false}
              onClick={() => dispatch({ type: "shopping_mall_filter"})}
              name="shopping_mall_filter"/>
              }
            label="Shoppings"
            />
          </ListItemIcon>
          <br/>


          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={places.bank_filter ? true : false}
              onClick={() => dispatch({ type: "bank_filter"})}
              name="bank_filter"/>
              }
            label="Agências Bancárias"
            />
          </ListItemIcon>
          <br/>

          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={places.gas_station_filter ? true : false}
              onClick={() => dispatch({ type: "gas_station_filter"})}
              name="gas_station_filter"/>
              }
            label="Postos de Gasolina"
            />
          </ListItemIcon>
          <br/>


          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={places.gym_filter ? true : false}
              onClick={() => dispatch({ type: "gym_filter"})}
              name="gym_filter"/>
              }
            label="Academias"
            />
          </ListItemIcon>
          <br/>
      </List>
    <Divider />
    </div>
  );

 
  return (
    <div>
      <Button
        color={"green"}
        variant={"contained"}
        onClick={toggleDrawer(true)}
        style={{"fontWeight": "bold", "width": "120px"}}>
          Locais
        </Button> 
        <React.Fragment key='left'>
          <Drawer anchor='left' open={open} onClose={toggleDrawer(false)} BackdropProps={{ invisible: true }}>
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}