import { useDistrictsContext } from "@/contexts";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  IconButton,
  List,
  ListItemIcon,
  ListSubheader,
  Typography,
} from "@mui/material";
import * as React from "react";

export function DrawerDistricts() {
  const { state, dispatch } = useDistrictsContext();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const make_districts_checkbox = (array_districts: string[]) =>
    array_districts.map((district, idx) => {
      return (
        <React.Fragment key={`fragment_${idx}`}>
          <ListItemIcon key={`listicon_${idx}`}>
            <FormControlLabel
              key={`formcontrol_${idx}`}
              control={
                <Checkbox
                  key={`checkbox_${idx}`}
                  size="small"
                  sx={{ margin: "0 0 0 20px", width: 10, height: 1 }}
                  onClick={() =>
                    dispatch({ type: "ACTIVE_DISTRICT", district: district })
                  }
                  checked={state.actives.includes(district)}
                />
              }
              label={
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ paddingLeft: "10px" }}
                >
                  {district}
                </Typography>
              }
            />
          </ListItemIcon>
          <br />
        </React.Fragment>
      );
    });

  const createDrawerContent = () => (
    <Box role="presentation" sx={{ width: "40vh" }}>
      <IconButton aria-label="close" onClick={toggleDrawer(false)}>
        <CloseIcon />
      </IconButton>

      <Typography
        align="justify"
        variant="overline"
        gutterBottom
        component="div"
        sx={{ padding: "0px 20px 0px 20px" }}
      >
        NESTA ABA ESCOLHEMOS QUAIS BAIRROS DEVEM SER ATIVOS PARA AS BUSCAS.
      </Typography>
      <List
        component="nav"
        subheader={
          <ListSubheader sx={{ fontWeight: 500, fontSize: "large" }}>
            Centro
          </ListSubheader>
        }
      >
        {make_districts_checkbox(state.center_districts)}
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader sx={{ fontWeight: 500, fontSize: "large" }}>
            Norte
          </ListSubheader>
        }
      >
        {make_districts_checkbox(state.north_districts)}
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader sx={{ fontWeight: 500, fontSize: "large" }}>
            Leste
          </ListSubheader>
        }
      >
        {make_districts_checkbox(state.east_districts)}
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader sx={{ fontWeight: 500, fontSize: "large" }}>
            Sudeste
          </ListSubheader>
        }
      >
        {make_districts_checkbox(state.southeast_districts)}
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader sx={{ fontWeight: 500, fontSize: "large" }}>
            Oeste
          </ListSubheader>
        }
      >
        {make_districts_checkbox(state.west_districts)}
      </List>
      <List
        component="nav"
        subheader={
          <ListSubheader sx={{ fontWeight: 500, fontSize: "large" }}>
            Sul
          </ListSubheader>
        }
      >
        {make_districts_checkbox(state.south_districts)}
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        sx={{
          color: "black",
          backgroundColor: "white",
          fontWeight: 500,
          width: "150px",
        }}
        variant="contained"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        Bairros
      </Button>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {createDrawerContent()}
      </Drawer>
    </div>
  );
}
