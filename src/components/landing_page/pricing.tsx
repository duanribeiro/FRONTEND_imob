import Link from "next/link";
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

export default function Pricing() {
  return (
    <Section title="Preços">
      <PricingInformation
        buttonList={{
          teste: (
            <Link href="/sign-up" passHref>
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                entrar
              </Button>
            </Link>
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
        <PricingCard
          price={0}
          button="Para usuários que querem testar e contribuir com sugestões."
        >
          <PricingFeature>Acesso ao Rádar Imóvel APP.</PricingFeature>
          <PricingFeature>
            Monitoramento de mais de 2000 imóveis.
          </PricingFeature>
          <PricingFeature>
            Imóveis em mais de 70 bairros da cidade.
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
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Fase de Testes
      </Typography>

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
        <Typography
          variant="body2"
          sx={{ ml: 1, color: "text.secondary" }}
        ></Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{ mt: 2, color: "text.secondary" }}
      ></Typography>

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