import { Box, Typography, Grid, Paper } from "@mui/material";
import { Section } from "@/components/landing_page";
import HomeIcon from "@mui/icons-material/Home";

export default function Features() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 8, paddingBottom: 22 }}>
      <Section
        title="Funcionalidades"
        // description={t('section_description')}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<HomeIcon sx={{ fontSize: 40, color: "#fff" }} />}
              title="Monitoramento de Preços em Tempo Real"
            >
              Acompanhe as mudanças no mercado com atualizações semanais sobre
              os preços de imóveis, garantindo que você sempre esteja informado
              sobre as tendências mais recentes.
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<HomeIcon sx={{ fontSize: 40, color: "#fff" }} />}
              title="Histórico de Preços"
            >
              Acesse o histórico completo de preços de aluguel e venda de
              imóveis, permitindo que você acompanhe a evolução dos valores e as
              movimentações de preços ao longo do tempo.
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={<HomeIcon sx={{ fontSize: 40, color: "#fff" }} />}
              title="Análise de Tendências de Mercado em Juiz de Fora"
            >
              Descubra padrões de comportamento no mercado imobiliário de Juiz
              de Fora e aproveite insights estratégicos para tomar decisões mais
              embasadas na compra ou venda de imóveis.
            </FeatureCard>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}

export const FeatureCard = (props: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Paper
    sx={{
      borderRadius: 3,
      p: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: 3,
      backgroundColor: "background.paper",
      height: "100%", // Adicionado para garantir altura uniforme
    }}
  >
    <Box
      sx={{
        borderRadius: "50%",
        background: "linear-gradient(to bottom right, #3f51b5, #9c27b0)",
        padding: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.icon}
    </Box>

    <Typography
      variant="h6"
      sx={{
        mt: 2,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {props.title}
    </Typography>

    <Box sx={{ my: 2, width: "50px", borderTop: "2px solid #9c27b0" }} />

    <Typography
      variant="body2"
      sx={{
        mt: 2,
        color: "text.secondary",
        textAlign: "center",
      }}
    >
      {props.children}
    </Typography>
  </Paper>
);
