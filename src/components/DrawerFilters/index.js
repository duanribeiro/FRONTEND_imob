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


const useStyles = makeStyles({
  list: {
    width: 300,
  },
});

export default function DrawerFilters() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const filters = useSelector(state => state.filters)
  const dispatch = useDispatch()


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

          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={filters.checked[3]}
              onChange={() => handleChange(3)}
              name="available_houses"/>
              }
            label="Casas disponíves"
            />
          </ListItemIcon>
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
          <br/>
      </List>
      <Button
          onClick={toggleDrawer(true)}
          variant="contained"
          style={{"fontWeight": "bold", "width": "100%", "borderRadius": 0, "backgroundColor": "black", "color": 'white'}}>
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