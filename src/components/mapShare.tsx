import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  TileLayer,
  Tooltip,
} from "react-leaflet";

import { getShareHouses } from "@/api";
import { ShareHouseMarker } from "@/components";

import { House, MyMapProps } from "@/types";
import { colors, positions } from "@/utils/polygons/mg_juiz_de_fora";
import { getPolygonCenter } from "@/utils/polygons";

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

const MyMap: React.FC<MyMapProps> = ({
  position = [-21.76147969399659, -43.348360061645515],
  zoom = 13.5,
}) => {
  const [housesState, setHousesState] = useState<House[]>([]);

  useEffect(() => {
    const fetchAndUpdateHouses = async () => {
      const fetchedHouses = await getShareHouses(window.location.pathname);
      setHousesState(fetchedHouses);
    };

    fetchAndUpdateHouses();
  }, []);

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
      {/* Mapa */}
      <MapContainer
        key="unique-map-instance"
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "98vh", zIndex: 1 }}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=d7dce56d-10c6-4d8a-bd39-04f6e42c2683" />

        {Object.keys(positions).map((district: string) => {
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

        {housesState.map((house, index) => (
          <ShareHouseMarker house={house} key={`${house.code}-${index}`} />
        ))}
      </MapContainer>
    </>
  );
};

export default MyMap;
