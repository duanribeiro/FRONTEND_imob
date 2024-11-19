import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import { Logo } from "./logo";
import { Section } from "@/components/landing_page";

export default function Footer() {
  return (
    <Section title="">
      <CenteredFooter logo={<Logo />} name="Radar Imóvel" />
    </Section>
  );
}

const CenteredFooter = (props: { logo: React.ReactNode; name: string }) => {
  return (
    <Container
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {props.logo}
      <Divider sx={{ my: 2, width: "100%" }} />
      <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>
        {`© Copyright ${new Date().getFullYear()} - ${props.name}.`}
      </Typography>
    </Container>
  );
};
