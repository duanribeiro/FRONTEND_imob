import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Grid, Chip, Typography, Button } from "@mui/material";
import { House } from "@/types";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import LinkIcon from "@mui/icons-material/Link";

const customIcon = new L.Icon({
  iconUrl: "/assets/map_icons/home.png",
  iconSize: [32, 35],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const formatYAxis = (tickItem: number) => {
  if (tickItem == 0) return "";
  if (tickItem >= 1 && tickItem < 1000) return `R$ ${(tickItem)}`;
  if (tickItem >= 1000 && tickItem < 1000000) return `R$ ${(tickItem / 1000).toFixed(1)}K`;
  return `R$ ${(tickItem / 1000000).toFixed(1)}M`;
};

const formatXAxis = (tickItem: any) => tickItem;

interface HouseMarkerProps {
  house: House;
}

export const HouseMarker: React.FC<HouseMarkerProps> = ({ house }) => {
  const { latitude, longitude, last_update = [], rent = [], price = [] } = house;
  const updates = Array.isArray(last_update) ? last_update : [];
  const rents = Array.isArray(rent) ? rent : [];
  const prices = Array.isArray(price) ? price : [];
  const maxLength = Math.max(updates.length, rents.length, prices.length);
  const graphData = Array.from({ length: maxLength }).map((_, index) => ({
    last_update: updates[index] ?? "",
    rent: rents[index] ?? null,
    price: prices[index] ?? null,
  }));

  const allValues = graphData.flatMap(item => [item.rent, item.price]).filter(v => v !== null) as number[];
  const yTicks = [...new Set(allValues)].sort((a, b) => a - b);

  const makeChips = (house: House) => {
    const chips: JSX.Element[] = [];
    if (house.area) chips.push(<Chip key="area" label={`${house.area}m²`} variant="outlined" size="small" style={{ marginRight: 5 }} />);
    if (house.bedroom) {
      const suffix = house.bedroom === 1 ? "quarto" : "quartos";
      chips.push(<Chip key="bedroom" label={`${house.bedroom} ${suffix}`} variant="outlined" size="small" style={{ marginRight: 5 }} />);
    }
    if (house.garage) {
      const suffix = house.garage === 1 ? "vaga" : "vagas";
      chips.push(<Chip key="garage" label={`${house.garage} ${suffix}`} variant="outlined" size="small" style={{ marginRight: 5 }} />);
    }
    return chips;
  };

  return (
    <Marker position={[latitude, longitude]} icon={customIcon}>
      <Popup>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Button
              fullWidth
              sx={{
                width: 300,
                backgroundColor: "black",
                color: "white",
                marginBottom: 2,
                padding: 1,
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
              }}
              startIcon={<LinkIcon sx={{ color: "white" }} />}
              onClick={() => window.open(house.url, "_blank")}
            >
              Ver o imóvel
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {house.description && house.description.length > 200
                ? `${house.description.slice(0, 200)}...`
                : house.description || "Descrição indisponível"}
            </Typography>
          </Grid>
          <Grid item>{makeChips(house)}</Grid>
          <Grid item>
            <LineChart width={300} height={200} data={graphData} style={{ marginLeft: -30 }}>
              <YAxis ticks={yTicks} interval={0} tickFormatter={formatYAxis} width={80} />
              <XAxis dataKey="last_update" tickFormatter={formatXAxis} />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="rent" name="Aluguel" stroke="green" />
              <Line type="monotone" dataKey="price" name="Venda" stroke="red" />
              <Tooltip />
              <Legend />
            </LineChart>
          </Grid>
        </Grid>
      </Popup>
    </Marker>
  );
};
