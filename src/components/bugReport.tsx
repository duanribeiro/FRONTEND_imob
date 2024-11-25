import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport"; // Ícone de bug
import CloseIcon from "@mui/icons-material/Close"; // Ícone de fechar
import { postBug } from "@/api";

export function BugReport() {
  const [open, setOpen] = useState<boolean>(false); // Estado para controlar o formulário
  const [bugDescription, setBugDescription] = useState<string>(""); // Estado para armazenar a descrição do bug

  // Função para abrir o formulário
  const handleOpen = () => setOpen(true);

  // Função para fechar o formulário
  const handleClose = () => setOpen(false);

  // Função para enviar o bug para o banco de dados
  const handleSubmit = async () => {
    if (!bugDescription.trim()) {
      alert("Por favor, forneça uma descrição do bug.");
      return;
    }
    try {
      const response = await postBug(bugDescription);
      alert("Bug reportado com sucesso!");
      setOpen(false);
      setBugDescription("");
    } catch (error) {
      alert("Erro ao enviar o bug. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          zIndex: 1000,
          cursor: "pointer",
          backgroundColor: "white",
          borderRadius: "50%", // Define o formato circular
          width: 30, // Largura fixa
          height: 30, // Altura fixa
          display: "flex", // Flex para centralizar o ícone
          justifyContent: "center", // Centraliza o ícone na horizontal
          alignItems: "center", // Centraliza o ícone na vertical
        }}
        onClick={handleOpen}
      >
        <BugReportIcon />
      </Box>

      {/* Modal para o formulário de reporte de bug */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
          }}
        >
          {/* Botão de fechar */}
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" gutterBottom>
            Reportar Bug
          </Typography>
          <TextField
            label="Descrição do Bug"
            multiline
            rows={4}
            fullWidth
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="inherit"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333", // Cor mais clara no hover
              },
            }}
          >
            Enviar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
