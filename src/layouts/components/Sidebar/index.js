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


const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  
  const dispatch = useDispatch()


  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  };

  const filters = useSelector(state => state)

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
            Categorias
          </ListSubheader>
        }
        className={classes.root}
      >
          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={filters.rent_houses ? true : false}
              onClick={() => dispatch({ type: "rent_houses"})}
              name="rent_houses"/>
              }
            label="Casas em Aluguel"
            />
          </ListItemIcon>
          <br/>

          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={filters.subway_station_filter ? true : false}
              onClick={() => dispatch({ type: "subway_station_filter"})}
              name="subway_station_filter"/>
              }
            label="Metro"
            />
          </ListItemIcon>
          <br/>

          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={filters.school_filter ? true : false}
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
              checked={filters.shopping_mall_filter ? true : false}
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
              checked={filters.bank_filter ? true : false}
              onClick={() => dispatch({ type: "bank_filter"})}
              name="bank_filter"/>
              }
            label="Agência Bancária"
            />
          </ListItemIcon>
          <br/>

          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={filters.gas_station_filter ? true : false}
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
              checked={filters.gym_filter ? true : false}
              onClick={() => dispatch({ type: "gym_filter"})}
              name="gym_filter"/>
              }
            label="Academia"
            />
          </ListItemIcon>
          <br/>
      </List>
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
            Locais
          </Button>

          <Drawer anchor='left' open={open} onClose={toggleDrawer(false)} BackdropProps={{ invisible: true }}>
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}