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
import StarIcon from '@material-ui/icons/Star';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ButtonGroupWalletHouse from '../ButtonGroupWalletHouse'
import api from "./../../plugins/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  }
}));


export default function DrawerWallet() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const [walletHouses, setWalletHouses] = React.useState([])

  const callAPIWalletGetHouses = () => {
    api.get(`http://127.0.0.1:5000/wallet/get_houses`)
      .then(response => {

        let arr = []
        for (var key in response.data['message']) {
          if (response.data['message'].hasOwnProperty(key)) {
              arr.push( response.data['message'][key]['house_id'] );
          }
      }
        console.log(arr)
        setWalletHouses(response.data['message'])
      })
  }
  React.useEffect(() => {
    callAPIWalletGetHouses()
  }, [])

  const array = ['123', '123','123', '123'].map(key => {
    return (
      <>
        <ListItemIcon>
          <Card elevation={0} className={classes.root}>
            <CardHeader
              action={
                <ButtonGroupWalletHouse/>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
          </Card>
        </ListItemIcon>
        <br/>
      </>
    );
  });

  
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
        {array}
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
              <StarIcon variant="contained" color="inherit"/>
            </Button>
          <Drawer anchor='left' open={open} onClose={toggleDrawer(false)} BackdropProps={{ invisible: true }}>
          {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}