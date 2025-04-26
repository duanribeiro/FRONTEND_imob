import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Logo } from "./logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <Logo />
            <Typography color="text.primary">Radar Imóvel</Typography>
          </Box>
          <Box>
            <SignUpButton forceRedirectUrl="/radar">
              <Button
                variant="text"
                sx={{ color: "black", textTransform: "none", marginRight: 2 }}
              >
                Cadastrar
              </Button>
            </SignUpButton>
            <SignInButton forceRedirectUrl="/radar">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                Entrar
              </Button>
            </SignInButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
