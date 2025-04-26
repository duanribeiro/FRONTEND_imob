import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Grid, Chip, Typography, Link } from "@mui/material";
import { House } from "@/types";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/assets/map_icons/home.png",
  iconSize: [32, 35],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const formatYAxis = (tickItem: number) => {
  if (tickItem >= 1000 && tickItem < 1000000) {
    return `R$ ${(tickItem / 1000).toFixed(1)}K`;
  } else {
    return `R$ ${(tickItem / 1000000).toFixed(1)}M`;
  }
};

const formatXAxis = (tickItem: any) => {
  return tickItem;
};

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

interface HouseMarkerProps {
  house: House;
}

export const ShareHouseMarker: React.FC<HouseMarkerProps> = ({ house }) => {
  const {
    latitude,
    longitude,
    real_estate,
    district,
    street,
    number,
    last_update,
  } = house;
  const graphData: {
    rent: number;
    price: number | null;
    last_update: string;
  }[] = [];
  const priceArray: (number | null)[] = [];
  const priceArraySize = Array.isArray(house.price) ? house.price.length : 0;
  const rentArraySize = Array.isArray(house.rent) ? house.rent.length : 0;
  const biggerArray = rentArraySize - priceArraySize;

  for (let i = 0; i < biggerArray; i++) {
    priceArray.push(null);
  }

  for (let i = 0; i < priceArraySize; i++) {
    priceArray.push(house.price[i]);
  }

  for (let i in house.last_update) {
    graphData.push({
      rent: house.rent[i],
      price: priceArray[i],
      last_update: house.last_update[i],
    });
  }

  function formatNumber(value) {
    return value.toLocaleString("pt-BR", { minimumFractionDigits: 3 });
  }

  const makeChips = (house: House) => {
    const chips: JSX.Element[] = [];
    if (house.area) {
      chips.push(
        <Chip
          key="area"
          label={`${house.area}m²`}
          variant="outlined"
          size="small"
          style={{ marginRight: 5 }}
        />
      );
    }
    if (house.bedroom) {
      const suffix = house.bedroom === 1 ? "quarto" : "quartos";
      chips.push(
        <Chip
          key="bedroom"
          label={`${house.bedroom} ${suffix}`}
          variant="outlined"
          size="small"
          style={{ marginRight: 5 }}
        />
      );
    }
    if (house.garage) {
      const suffix = house.garage === 1 ? "vaga" : "vagas";
      chips.push(
        <Chip
          key="garage"
          label={`${house.garage} ${suffix}`}
          variant="outlined"
          size="small"
          style={{ marginRight: 5 }}
        />
      );
    }
    return chips;
  };

  return (
    <Marker position={[latitude, longitude]} icon={customIcon}>
      <Popup>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={0}
        >
          {/* Real estate */}
          <Grid item className="capitalize">
            <Typography variant="body2" style={{ margin: 0, padding: 0 }}>
              <Link
                href={house.url}
                underline="hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                LINK PARA O IMÓVEL
              </Link>
            </Typography>
          </Grid>

          {/*Descrição */}
          <Grid item className="capitalize">
            <Typography variant="body2" style={{ margin: 0, padding: 0 }}>
              {house.description && house.description.length > 200
                ? `${house.description.slice(0, 200)}...`
                : house.description || "Descrição indisponível"}
            </Typography>
          </Grid>

          {/* Address */}
          {/* <Grid item className="capitalize">
            {street && (
              <Typography gutterBottom variant="body2">
                {street.toLowerCase().capitalize()}
                {number ? `, ${number}` : ""}
              </Typography>
            )}
          </Grid> */}

          {/* Chips */}
          <br />
          <Grid item>{makeChips(house)}</Grid>
        </Grid>
      </Popup>
    </Marker>
  );
};
