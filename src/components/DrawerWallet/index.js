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
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  }
}));


export default function DrawerWallet() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const wallet = useSelector(state => state.wallet)

  const array = wallet['houses'].map(item => {
    const subheader = (
      <ul>
        <li>{`${item["street"]}${item["number"] ? `, ${item["number"]}` : ''} `}</li>
        <li>{`R$ ${item["rent"][item["rent"].length - 1]}/mês`}</li>
      </ul>
    );
    return (
      <>
        <ListItemIcon>
          <Card elevation={0} className={classes.root}>
            <CardHeader
              action={
                <ButtonGroupWalletHouse item={item}/>
              }
              title={`${item["district"]}  `}
              subheader={subheader}
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
        <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        >
          {array}
        </Grid>
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