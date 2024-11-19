import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListSubheader,
  SxProps,
  Typography,
} from "@mui/material";

import {
  DatePickerFilters,
  SliderRentPrices,
  SliderSellPrices,
} from "@/components";
import { useFiltersContext, useDistrictsContext } from "@/contexts";

const drawerSx: SxProps = {
  color: "black",
  backgroundColor: "white",
  fontWeight: 500,
  width: "150px",
};

const drawerBoxSx: SxProps = {
  width: "45vh",
};

const typographySx: SxProps = {
  padding: "20px 20px 0px 20px",
};

const checkboxSx: SxProps = {
  width: 10,
  height: 1,
  margin: "0 20px 0 20px",
};

const buttonSx: SxProps = {
  fontWeight: "bold",
  width: "100%",
  borderRadius: 0,
  backgroundColor: "black",
  color: "white",
};

const ListItemDateSx: SxProps = {
  margin: "0 0 30px 0",
};
const ListItemSliderSx: SxProps = {
  margin: "0 0 0 0",
};

export function DrawerFilters() {
  const { state, dispatch } = useFiltersContext();
  const { state: districtsState, dispatch: districtsDispatch } =
    useDistrictsContext();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const isDisabled = districtsState.actives.length === 0;

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleChange = (position: number) => {
    const updatedCheckedState = state.checked.map((item, index) =>
      index === position ? !item : item
    );
    dispatch({ type: "UPDATE_CHECKBOX", payload: updatedCheckedState });
  };

  const createDrawerContent = () => (
    <Box role="presentation" className="drawer-districts" sx={drawerBoxSx}>
      <IconButton
        aria-label="close"
        onClick={toggleDrawer(false)}
        disabled={isDisabled}
      >
        <CloseIcon />
      </IconButton>

      <Typography
        align="justify"
        variant="overline"
        gutterBottom
        component="div"
        sx={typographySx}
      >
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
      >
        {/* Data inicial e final */}
        {/* <ListItemIcon sx={ListItemDateSx}>
          <Checkbox
            size="small"
            sx={checkboxSx}
            checked={state.checked[0]}
            onChange={() => handleChange(0)}
          />
          <DatePickerFilters />
        </ListItemIcon> */}

        {/* Preço do Aluguel */}
        <ListItemIcon sx={ListItemSliderSx}>
          <Checkbox
            size="small"
            sx={checkboxSx}
            checked={state.checked[1]}
            onChange={() => handleChange(1)}
            name="slider_rent_prices"
          />
          <SliderRentPrices />
        </ListItemIcon>

        {/* Preço de Venda*/}
        <ListItemIcon sx={ListItemSliderSx}>
          <Checkbox
            size="small"
            sx={checkboxSx}
            checked={state.checked[2]}
            onChange={() => handleChange(2)}
            name="slider_sell_prices"
          />
          <SliderSellPrices />
        </ListItemIcon>
      </List>
      {/* <Button
        // onClick={() => callHouses()}
        variant="contained"
        sx={buttonSx}
      >
        Buscar
      </Button> */}
    </Box>
  );

  return (
    <div>
      <Button
        sx={{
          ...drawerSx,
          opacity: isDisabled ? 1 : 1,
        }}
        variant="contained"
        onClick={toggleDrawer(true)}
        color="inherit"
        disabled={isDisabled}
      >
        Filtros
      </Button>
      <Drawer anchor="left" open={drawerOpen}>
        {createDrawerContent()}
      </Drawer>
    </div>
  );
}
