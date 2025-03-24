import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { Box, CircularProgress, Typography } from "@mui/material";

import { fetchHouses, fetchUser } from "@/api";
import {
  DrawerDistricts,
  DrawerFilters,
  HouseMarker,
  BugReport,
  DrawerTableHouses,
  PremiumHouseMarker,
  WhatsAppButton,
  StripeButton,
  CustomUserButton
} from "@/components";
import {
  useDistrictsContext,
  useFiltersContext,
  usePlacesContext,
  useHousesContext,
  useUserContext,
} from "@/contexts";
import {  MyMapProps } from "@/types";
import { colors, positions } from "@/utils/polygons/mg_juiz_de_fora";
import { getPolygonCenter } from "@/utils/polygons";
import { UserButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/clerk-react";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

const MyMap: React.FC<MyMapProps> = ({
  position = [-21.76147969399659, -43.348360061645515],
  zoom = 13.5,
}) => {
  const { userId } = useAuth();
  const { user } = useUser();

  const { state: housesState, dispatch: housesDispatch } = useHousesContext();
  const { state: placesState } = usePlacesContext();
  const { state: filtersState } = useFiltersContext();
  const { state: districtsState } = useDistrictsContext();
  const { state: userState, dispatch: userDispatch  } = useUserContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const email = user?.emailAddresses[0]?.emailAddress;
      if (userId) {
        const user = await fetchUser(userId, email);
        console.log({user})
        userDispatch({ type: "SET_USER", payload: user });
      }
    };
  
    getUser();
  }, [userId]);
  

  useEffect(() => {
    const fetchAndUpdateHouses = async () => {
      setLoading(true);
      
      const fetchedHouses = await fetchHouses(
        placesState,
        filtersState,
        districtsState,
        userId
      );
      housesDispatch({ type: "set_houses", payload: fetchedHouses });
      setLoading(false);
    };

    fetchAndUpdateHouses();
  }, [placesState, filtersState, districtsState, userId]);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {},
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

      <Box
        sx={{
          zIndex: 1000,
          position: "absolute",
          top: 20,
          left: 60,
          color: "black",
          backgroundColor: "white",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60px",
          width: "108px",
          borderRadius: "4px",
        }}
      >
        <Box
          sx={{
            zIndex: 1000,
          }}
        >
          <WhatsAppButton />
        </Box>
        <Box
          sx={{
            zIndex: 1000,
          }}
        >
          <StripeButton />
        </Box>
        <Box
          sx={{

            zIndex: 1000,
          }}
        >
          <CustomUserButton/>
        </Box>
      </Box>
      
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: { xs: "none", sm: "block" }, 
        }}
      >
        <Typography sx={{ backgroundColor: "white", color: "black", padding: 1 }}>
        {housesState.length} anúncios encontrados
      </Typography>
      </Box>

      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1500,
          }}
        >
          <CircularProgress
            sx={{
              color: "white",
              animation: "glow 1.5s infinite alternate",
              "@keyframes glow": {
                "0%": { filter: "drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.5))" },
                "100%": { filter: "drop-shadow(0px 0px 15px rgba(255, 255, 255, 1))" },
              },
            }}
            size={70}
            thickness={20}
          />
        </Box>
      )}

      <MapContainer
        key="unique-map-instance"
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "98vh", zIndex: 1 }}
      >
        <Box sx={{ position: "absolute", top: 80, left: 10, zIndex: 1000 }}>
          <DrawerDistricts />
        </Box>
        <Box sx={{ position: "absolute", top: 125, left: 10, zIndex: 1000 }}>
          <DrawerFilters />
        </Box>
        <Box sx={{ position: "absolute", top: 170, left: 10, zIndex: 1000 }}>
          <DrawerTableHouses />
        </Box>
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=d7dce56d-10c6-4d8a-bd39-04f6e42c2683" />
        <MapEvents />

        {districtsState.all.map((district: string) => {
          const districtPositions = positions[district];

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
        {housesState.map((house, index) =>
          house.code != null ? (
            <HouseMarker house={house} key={`${house.code}-${index}`} />
          ) : (
            <PremiumHouseMarker house={house} key={`${house.code}-${index}`} />
          )
        )}
      </MapContainer>
    </>
  );
};

export default MyMap;
