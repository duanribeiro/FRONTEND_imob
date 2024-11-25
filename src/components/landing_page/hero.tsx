import { Button, Typography, Box } from "@mui/material";

export default function Hero() {
  return (
    <Box sx={{ py: { xs: 10, sm: 35 }, textAlign: "center" }}>
      {/* Título */}
      <Typography
        variant="h4" // Título menor
        sx={{
          fontWeight: "bold",
          letterSpacing: "0.5px",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Tamanho do título ajustado
        }}
      >
        Tecnologia para monitorar o mercado imobiliário de Juiz de Fora
      </Typography>

      {/* Descrição */}
      <Typography
        variant="body1"
        sx={{
          mx: "auto",
          mt: 3,
          maxWidth: "960px", // Limita o tamanho máximo
          color: "text.secondary", // Cor secundária do tema
        }}
      >
        Descubra as tendências do mercado imobiliário com nossa ferramenta que
        monitora os preços de imóveis de Juiz de Fora, fornecendo um histórico
        detalhado para ajudar você a tomar decisões mais inteligentes.
      </Typography>

      {/* Botões */}
      <Box
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
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
      </Box>
    </Box>
  );
}
