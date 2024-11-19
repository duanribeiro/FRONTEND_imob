import { Box, Typography, Grid, Paper } from "@mui/material";
import { Section } from "@/components/landing_page";

export default function Features() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 10 }}>
      <Section
        title="Funcionalidades"
        // description={t('section_description')}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="40"
                  height="40"
                >
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3M12 12l8-4.5M12 12v9M12 12L4 7.5" />
                </svg>
              }
              title="Monitoramento de Preços em Tempo Real"
            >
              Acompanhe as mudanças no mercado com atualizações semanais sobre
              os preços de imóveis, garantindo que você sempre esteja informado
              sobre as tendências mais recentes.
            </FeatureCard>
          </Grid>
          {/* Adicione mais FeatureCards aqui conforme necessário */}
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
