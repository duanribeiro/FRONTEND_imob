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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';
import api from "./../../plugins/axios"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});


export default function DrawerWallet(user_id) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  
  const dispatch = useDispatch()
  const mapFilters = useSelector(state => state.mapFilters)
  
  React.useEffect(() => {
    api.post(`http://localhost:5000/wallet/get_houses`, {'username': user_id['user_id']})
    .then(response => {
      console.log(response['data'])
    })
  }, [])

  
  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(open)
  }

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
            Meus Investimentos
          </ListSubheader>
        }
        className={classes.root}
      >
          <ListItemIcon>
            <FormControlLabel control={
              <Checkbox
              style={{"marginLeft": "20px"}}
              checked={mapFilters.rent_houses ? true : false}
              onClick={() => dispatch({ type: "rent_houses"})}
              name="rent_houses"/>
              }
            label="Casas em Aluguel"
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
            style={{"fontWeight": "bold", "width": "65px", "height": "62px"}}>
              <AssessmentIcon variant="contained" color="inherit"/>
            </Button>
          <Drawer anchor='left' open={open} onClose={toggleDrawer(false)} BackdropProps={{ invisible: true }}>
          {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}