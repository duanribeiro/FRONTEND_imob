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
      return
    }
    setOpen(open)
  }

  const center_districts = ['bela vista', 'consolação', 'liberdade', 'santa cecília', 'cambuci',
    'bom retiro', 'sé', 'barra funda', 'brás', 'pari', 'república']
  
  const north_districts = ['santana', 'vila guilherme', 'vila maria', 'casa verde', 'limão', 'freguesia do ó', 'pirituba',
    'são domingos', 'vila medeiros', 'tucuruvi', 'mandaqui', 'cachoerinha', 'brasilândia', 'jaraguá', 'tremembé']
  
  const make_districts_checkbox = districts => districts.map((district, idx) => {
    return (
      <>
        <ListItemIcon key={`listicon_${idx}`}>
          <FormControlLabel
          style={{"height": "10px" }}
          key={`formcontrol_${idx}`}
          control={
              <Checkbox
              key={`checkbox_${idx}`}
              style={{"marginLeft": "20px"}}
              onClick={() => dispatch({"type": "active_district", "district": district})}
              checked={filters.active_districts.includes(district) ? true : false}
              />
            }
          label={<Typography variant="body2" color="textSecondary">{district}</Typography>}
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
        subheader={
          <ListSubheader component="div" id="nested-list-subheader-2">
            Centro
          </ListSubheader>
        }
        className={classes.root}
        >
            {make_districts_checkbox(center_districts)}
        </List>

        <List
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader-2">
            Zona Norte
          </ListSubheader>
        }
        className={classes.root}
        >
            {make_districts_checkbox(north_districts)}
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