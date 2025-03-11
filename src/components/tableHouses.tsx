import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import Paper from "@mui/material/Paper";
import { useDistrictsContext, useHousesContext } from "@/contexts";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { shareHouses } from "@/api";

import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  SxProps,
  Typography,
} from "@mui/material";
import { useMap } from "react-leaflet";
import { url } from "inspector";

const paginationModel = { page: 0, pageSize: 25 };

const drawerSx: SxProps = {
  color: "black",
  backgroundColor: "white",
  fontWeight: 500,
  width: "150px",
};

const drawerBoxSx: SxProps = {
  width: "75vh",
};

const typographySx: SxProps = {
  padding: "20px 20px 0px 20px",
};

export function DrawerTableHouses() {
  const { state: districtsState } = useDistrictsContext();
  const { state: housesState, dispatch: housesDispatch } = useHousesContext();
  const map = useMap();

  const rows = Array.isArray(housesState)
    ? housesState.map((house) => ({
        id: house.id,
        district: house.district ?? "",
        price: house.price ? house.price[house.price.length - 1] : "",
        rent: house.rent ? house.rent[house.rent.length - 1] : "",
        area: house.area ?? "",
        bedroom: house.bedroom ?? "",
        bathroom: house.bathroom ?? "",
        garage: house.garage ?? "",
        real_estate: house.real_estate ?? "",
        latitude: house.latitude ?? null,
        longitude: house.longitude ?? null,
        url: house.url ?? null,
      }))
    : [];

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState<string | null>(
    null
  );

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

  const handleGpsClick = (latitude: number, longitude: number) => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], 18);
    } else {
      alert("Coordenadas não disponíveis para este imóvel.");
    }
  };

  const handleDeleteHouse = (id: number) => {
    housesDispatch({ type: "remove_house", payload: id });
  };

  const handleShare = async () => {
    try {
      const ids = housesState.map((house) => house.id);
      const response = await shareHouses(ids);
      setResponseMessage(response);
    } catch (error) {
      console.error("Erro ao compartilhar as casas:", error);
      setResponseMessage("Erro ao compartilhar as casas.");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "price",
      headerName: "Venda",
      width: 90,
      valueGetter: (value, row) => {
        if (isNaN(value)) {
          return "";
        }
        return new Intl.NumberFormat("pt-BR", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      },
    },
    {
      field: "rent",
      headerName: "Aluguel",
      width: 70,
      valueGetter: (value, row) => {
        if (isNaN(value)) {
          return "";
        }
        return new Intl.NumberFormat("pt-BR", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      },
    },
    { field: "area", headerName: "Área (m²)", width: 80 },
    { field: "bedroom", headerName: "Quartos", width: 80 },
    { field: "bathroom", headerName: "Banheiros", width: 90 },
    { field: "garage", headerName: "Garagem", width: 80 },
    { field: "real_estate", headerName: "Imobiliária", width: 90 },
    {
      field: "actions",
      headerName: "Ações",
      width: 140,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "4px" }}>
          <IconButton
            color="primary"
            onClick={() =>
              handleGpsClick(params.row.latitude, params.row.longitude)
            }
            sx={{
              color: "black",
              padding: "2px",
            }}
          >
            <GpsFixedIcon />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => {
              window.open(params.row.url, "_blank");
            }}
            sx={{
              color: "black",
              padding: "2px",
            }}
          >
            <OpenInNewIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleDeleteHouse(params.row.id)}
            sx={{
              padding: "6px 2px",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

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
        NESTA ABA FILTRAMOS OS ANÚNCIOS.
      </Typography>

      <Paper sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[50, 100]}
          sx={{ border: 0 }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          density="compact"
          getRowId={(row) => row.id}
        />
      </Paper>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleShare}
          startIcon={<ShareIcon />}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Compartilhar
        </Button>
      </Box>

      {responseMessage && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            {`https://radarimovel.com/share/${responseMessage}`}
          </Typography>
        </Box>
      )}
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
        ANÚNCIOS
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
