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

export default function DrawerDistricts() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  
  const dispatch = useDispatch()
  const filters = useSelector(state => state)


  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  };

  const districts =  ['bela vista', 'consolação']
  const districts_list = districts.map((district, idx) => {
    return (
      <>
        <ListItemIcon key={`listicon_${idx}`}>
          <FormControlLabel
          key={`formcontrol_${idx}`}
          control={
              <Checkbox
              key={`checkbox_${idx}`}
              style={{"marginLeft": "20px"}}
              onClick={() => dispatch({"type": "active_district", "district": district})}
              checked={filters.active_districts.includes(district) ? true : false}
              />
            }
          label={district}
          />
        </ListItemIcon>
        <br/>
      </>
    )
  })


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
            Bairros
          </ListSubheader>
        }
        className={classes.root}
      >
          {districts_list}
      </List>
    <Divider />
    </div>
  );

  return (
    <div>
        <React.Fragment key='left'>
          <Button variant={"contained"} onClick={toggleDrawer(true)} style={{"fontWeight": "bold", "width": "100px"}}>Bairros</Button>
          <Drawer anchor='left' open={open} onClose={toggleDrawer(false)} BackdropProps={{ invisible: true }}>
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}