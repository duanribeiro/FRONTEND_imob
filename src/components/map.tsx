import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { Box } from "@mui/material";

import { fetchHouses } from "@/api";
import {
  DrawerDistricts,
  DrawerFilters,
  HouseMarker,
  BugReport,
} from "@/components";
import {
  useDistrictsContext,
  useFiltersContext,
  usePlacesContext,
} from "@/contexts";
import { House, MyMapProps } from "@/types";
import { colors, positions } from "@/utils/polygons/mg_juiz_de_fora";
import { getPolygonCenter } from "@/utils/polygons";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

const MyMap: React.FC<MyMapProps> = ({
  position = [-21.76147969399659, -43.348360061645515],
  zoom = 13.5,
}) => {
  const { userId } = useAuth();
  const [houses, setHouses] = useState<House[]>([]);
  const { state: placesState, dispatch: placesDispatch } = usePlacesContext();
  const { state: filtersState, dispatch: filtersDispatch } =
    useFiltersContext();
  const { state: districtsState, dispatch: districtsDispatch } =
    useDistrictsContext();

  useEffect(() => {
    const fetchAndUpdateHouses = async () => {
      const fetchedHouses = await fetchHouses(
        placesState,
        filtersState,
        districtsState,
        userId
      );
      setHouses(fetchedHouses);
    };

    fetchAndUpdateHouses();
  }, [placesState, filtersState, districtsState, userId]);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        // Exibe as coordenadas do clique
        console.log([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  interface CustomTooltipProps {
    name?: string;
  }
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ name }) => {
    return (
      <div
        style={{
          margin: "0px",
          padding: "0px",
          color: "black",
          fontSize: "9px",
        }}
      >{`${name}`}</div>
    );
  };

  return (
    <>
      {/* User Profile */}
      <Box
        sx={{
          position: "absolute",
          top: 25,
          right: 25,
          zIndex: 1000,
        }}
      >
        <UserButton />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 24,
          right: 95,
          zIndex: 1000,
        }}
      >
        <BugReport />
      </Box>

      {/* Drawer Districts */}
      <Box sx={{ position: "absolute", top: 115, left: 10, zIndex: 1000 }}>
        <DrawerDistricts />
      </Box>

      {/* Botão Filtros */}
      <Box sx={{ position: "absolute", top: 160, left: 10, zIndex: 1000 }}>
        <DrawerFilters />
      </Box>

      {/* Mapa */}
      <MapContainer
        key="unique-map-instance"
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "98vh", zIndex: 1 }}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=d7dce56d-10c6-4d8a-bd39-04f6e42c2683" />
        <MapEvents />

        {districtsState.all.map((district: string) => {
          const districtPositions = positions[district];
          const center = getPolygonCenter(districtPositions);

          return (
            <React.Fragment key={district}>
              <Polygon
                pathOptions={{
                  color: colors[district],
                }}
                positions={districtPositions}
              >
                <Tooltip direction="center" opacity={0.8} permanent>
                  <CustomTooltip name={district} />
                </Tooltip>
              </Polygon>
            </React.Fragment>
          );
        })}
        {houses.map((house, index) => (
          <HouseMarker house={house} key={`${house.code}-${index}`} />
        ))}
      </MapContainer>
    </>
  );
};

export default MyMap;
