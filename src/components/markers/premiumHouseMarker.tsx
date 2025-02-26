import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Paper, Typography, Box, List, Button, ListItem } from "@mui/material";
import { House } from "@/types";

const customIcon = new L.Icon({
  iconUrl: "/assets/map_icons/locker.png",
  iconSize: [32, 35],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface HouseMarkerProps {
  house: House;
  price: string;
  button?: React.ReactNode;
  children?: React.ReactNode;
}

const MyButton = () => {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        backgroundColor: "black",
        color: "white !important",
        "&:hover": {
          backgroundColor: "black",
          color: "white !important",
        },
      }}
      href="/radar"
    >
      Assine o Radar Imóvel
    </Button>
  );
};

export const PricingCard = (props: {
  button: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Box sx={{ p: 3, borderRadius: 2, textAlign: "center" }}>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          R$9.90
        </Typography>
        <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
          /mês
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>{props.button}</Box>

      <List sx={{ mt: 4, textAlign: "left" }}>{props.children}</List>
    </Box>
  );
};

export const PricingFeature = (props: { children: React.ReactNode }) => (
  <ListItem
    sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}
  >
    <svg
      className="mr-1 size-6 stroke-current stroke-2 text-purple-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 12l5 5L20 7" />
    </svg>
    {props.children}
  </ListItem>
);



export const PremiumHouseMarker: React.FC<HouseMarkerProps> = ({ house, price, button, children }) => {
  const { latitude, longitude } = house;

  return (
    <Marker position={[latitude, longitude]} icon={customIcon}>
      <Popup>
        <PricingCard  button={<MyButton />}>
          <PricingFeature>Acesso ao Radar Imóvel APP.</PricingFeature>
          <PricingFeature>
            Monitoramento de mais de 50.000 imóveis.
          </PricingFeature>
          <PricingFeature>
            Imóveis em mais de 70 bairros da cidade.
          </PricingFeature>
        </PricingCard>
      </Popup>
    </Marker>
  );
};