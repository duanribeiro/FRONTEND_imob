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
import SliderDates from '../SliderDates'
import SliderRentPrices from '../SliderRentPrices'
import SliderSellPrices from '../SliderSellPrices'
import api from "./../../plugins/axios";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  list: {
    width: 300,
  },
});

export default function DrawerFilters() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const places = useSelector(state => state.places)
  const filters = useSelector(state => state.filters)
  const map = useSelector(state => state.map)

  const dispatch = useDispatch()

  const callHouses = () => {
    dispatch({type: 'SET_LOADING_ON'})
    api.post(`${process.env.REACT_APP_BACKEND_API}/maps/get_houses`, {
       "places": places,
       "filters": filters,
     })
     .then(response => {
      map.clearMap()
      map.makePolygon(places.active_districts)
      dispatch({type: 'SET_LOADING_OFF'})
       if (response.data) {
         response.data.forEach(element => {
          map.makeIcon(
          element,
            [element["latitude"], element["longitude"]],
            "rent_house",
            dispatch
          )
        })
      map.bindLayerMap()
      }
    })
  }

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  }

  const handleChange = (position) => {
    const updatedCheckedState = filters.checked.map((item, index) =>
      index === position ? !item : item
    );
    dispatch({type: 'UPDATE_CHECKBOX', payload: updatedCheckedState})
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      styles= {{"width": 250}}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Typography align="justify" variant="overline" gutterBottom component="div" style={{"padding": "20px 20px 0px 20px"}}>
        NESTA ABA FILTRAMOS INFORMAÇÕES DOS BAIRROS ATIVOS.
      </Typography>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Filtros
          </ListSubheader>
        }
        className={classes.root}
      >
          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={filters.checked[0]}
              onChange={() => handleChange(0)}
              name="slider_dates"/>
              }
            />
            <SliderDates/>
          </ListItemIcon>
          
          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={filters.checked[1]}
              onChange={() => handleChange(1)}
              name="slider_rent_prices"/>
              }
            />
            <SliderRentPrices/>
          </ListItemIcon>

          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={filters.checked[2]}
              onChange={() => handleChange(2)}
              name="slider_sell_prices"/>
              }
            />
            <SliderSellPrices/>
          </ListItemIcon>
          <br/>
{/* 
          <br/>
          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={filters.checked[4]}
              onChange={() => handleChange(4)}
              name="favorite_houses"/>
              }
            label="Minhas casas favoritas"
            />
          </ListItemIcon>
          <br/> */}
      </List>
      <Button
          onClick={() => callHouses()}
          variant="contained"
          style={{
            "fontWeight": "bold",
            "width": "100%",
            "borderRadius": 0,
            "backgroundColor": "black",
            "color": 'white'
            }}>
            Buscar
          </Button>
    <Divider />
    </div>
  );

  return (
    <div>
        <React.Fragment key='left'>
          <Button
          variant={"contained"}
          onClick={toggleDrawer(true)}
          style={{"fontWeight": "bold", "width": "100px"}}>
            Filtros
          </Button>

          <Drawer anchor='left' open={open} onClose={toggleDrawer(false)} BackdropProps={{ invisible: true }}>
            {list()}
          </Drawer>
        </React.Fragment>

    </div>
  );
}