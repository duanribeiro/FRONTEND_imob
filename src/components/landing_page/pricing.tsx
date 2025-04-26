import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import { Section } from "@/components/landing_page";

// const stripePromise = loadStripe(
//   "pk_test_51QPOu3CKdNLiy4hXAjxjfj01CxLvfaurbyzaoTLgVDFUVMtoEFtGNmEfLirLMJkWDlSAMA9cowI5lz82AWGLoDLh00DxZzoGdG"
// );
const stripePromise = loadStripe(
  "pk_live_51QPOu3CKdNLiy4hXJEapVcDHc9iEus6umk5eZpqm15iWWLORuD1z2JquyKUWcJuf4HUvn8OS7736pQENRG1IhyNu00Fuwv96c3"
);

export default function Pricing() {
  return (
    <Section title="Preços">
      <PricingInformation
        buttonList={{
          teste: (
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Entrar
            </Button>
          ),
        }}
      />
    </Section>
  );
}

export const PricingInformation = (props: {
  buttonList: Record<string, React.ReactNode>;
}) => (
  <Box sx={{ display: "grid", placeItems: "center" }}>
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <PricingCard price={0} button={<MyButton />}>
          <PricingFeature>Acesso ao Radar Imóvel.</PricingFeature>
          <PricingFeature>
            Monitoramento de mais de 2000 imóveis.
          </PricingFeature>
        </PricingCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <PricingCard price={9.99} button={<MyButton />}>
          <PricingFeature>Acesso ao Radar Imóvel Premium.</PricingFeature>
          <PricingFeature>
            Monitoramento de mais de 5000 imóveis.
          </PricingFeature>
        </PricingCard>
      </Grid>
    </Grid>
  </Box>
);

export const PricingCard = (props: {
  price: number;
  button: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, textAlign: "center" }}>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {`R$${props.price}`}
        </Typography>
        <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
          /mês
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>{props.button}</Box>

      <List sx={{ mt: 4, textAlign: "left" }}>{props.children}</List>
    </Paper>
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

const StripeCheckoutButton = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Erro ao redirecionar para o checkout:", error);
    }
  };

  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: "black",
        color: "white",
        "&:hover": {
          backgroundColor: "black",
        },
      }}
      onClick={handleCheckout}
    >
      Assinar Agora
    </Button>
  );
};

const MyButton = () => {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        backgroundColor: "black",
        color: "white",
        "&:hover": {
          backgroundColor: "black",
        },
      }}
      href="/radar"
    >
      Acesse o APP
    </Button>
  );
};
