import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  IconButton,
  List,
  ListItem,
  SxProps,
  Typography,
  Divider,
} from "@mui/material";

import {
  SliderRentPrices,
  SliderSellPrices,
  SliderArea,
  SliderRooms,
  SliderBathrooms,
  SliderParkings,
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
  marginRight: "10px",
};

const buttonSx: SxProps = {
  fontWeight: "bold",
  width: "100%",
  borderRadius: 0,
  backgroundColor: "black",
  color: "white",
};

export function DrawerFilters() {
  const { state, dispatch } = useFiltersContext();
  const { state: districtsState, dispatch: districtsDispatch } =
    useDistrictsContext();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const isDisabled = districtsState.actives.length === 0;

  const toggleDrawer = (open: boolean) => (event: any) => {
    // Evita o fechamento do Drawer se o clique foi dentro do Drawer
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const handleSliderClick = (e: React.MouseEvent) => {
    // Impede o fechamento do drawer ao interagir com o slider
    e.stopPropagation();
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
      <List>
        <ListItem disablePadding sx={{ marginTop: 1, marginBottom: 1 }}>
          <Checkbox
            size="small"
            sx={checkboxSx}
            checked={state.actives.slider_rent_prices}
            onChange={() =>
              dispatch({
                type: "TOGGLE_ACTIVE_FILTER",
                payload: "slider_rent_prices",
              })
            }
            name="slider_rent_prices"
          />
          <Box sx={{ flex: 1 }} onClick={handleSliderClick}>
            <SliderRentPrices />
          </Box>
        </ListItem>
        <Divider />

        <ListItem disablePadding sx={{ marginTop: 1, marginBottom: 1 }}>
          <Checkbox
            size="small"
            sx={checkboxSx}
            checked={state.actives.slider_sell_prices}
            onChange={() =>
              dispatch({
                type: "TOGGLE_ACTIVE_FILTER",
                payload: "slider_sell_prices",
              })
            }
            name="slider_sell_prices"
          />
          <Box sx={{ flex: 1 }} onClick={handleSliderClick}>
            <SliderSellPrices />
          </Box>
        </ListItem>
        <Divider />

        <ListItem disablePadding sx={{ marginTop: 1, marginBottom: 1 }}>
          <Checkbox
            size="small"
            sx={checkboxSx}
            checked={state.actives.slider_area}
            onChange={() =>
              dispatch({
                type: "TOGGLE_ACTIVE_FILTER",
                payload: "slider_area",
              })
            }
            name="slider_area"
          />
          <Box sx={{ flex: 1 }} onClick={handleSliderClick}>
            <SliderArea />
          </Box>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{ marginTop: 1, marginBottom: 1 }}>
          <Checkbox
            size="small"
            sx={checkboxSx}
            checked={state.actives.slider_rooms}
            onChange={() =>
              dispatch({
                type: "TOGGLE_ACTIVE_FILTER",
                payload: "slider_rooms",
              })
            }
            name="slider_rooms"
          />
          <Box sx={{ flex: 1 }} onClick={handleSliderClick}>
            <SliderRooms />
          </Box>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{ marginTop: 1, marginBottom: 1 }}>
          <Checkbox
            size="small"
            sx={checkboxSx}
            checked={state.actives.slider_bathrooms}
            onChange={() =>
              dispatch({
                type: "TOGGLE_ACTIVE_FILTER",
                payload: "slider_bathrooms",
              })
            }
            name="slider_bathrooms"
          />
          <Box sx={{ flex: 1 }} onClick={handleSliderClick}>
            <SliderBathrooms />
          </Box>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{ marginTop: 1, marginBottom: 1 }}>
          <Checkbox
            size="small"
            sx={checkboxSx}
            checked={state.actives.slider_parkings}
            onChange={() =>
              dispatch({
                type: "TOGGLE_ACTIVE_FILTER",
                payload: "slider_parkings",
              })
            }
            name="slider_parkings"
          />
          <Box sx={{ flex: 1 }} onClick={handleSliderClick}>
            <SliderParkings />
          </Box>
        </ListItem>
        <Divider />
      </List>
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
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        slotProps={{
          backdrop: {
            invisible: true,
          },
        }}
      >
        {createDrawerContent()}
      </Drawer>
    </div>
  );
}
