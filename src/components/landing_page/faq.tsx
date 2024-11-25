"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Section } from "@/components/landing_page";

export default function FAQ() {
  return (
    <Section title="">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Por quanto tempo vai durar a fase de testes?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Acreditamos que ainda existem muitas melhorias a serem feitas,
            portanto, ainda não existe uma data para o fim de testes.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Como vocês conseguem os preços de imóveis?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Utilizamos robôs para monitorar os preços na internet e atualizar a
            nossa base de dados ao longo do tempo.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>
            Esse sistema funciona somente para Juiz de Fora/MG?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sim, no momento estamos focando nossa energia em melhorar o produto
            para essa região.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Como posso entrar em contato com vocês?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pode enviar suas dúvidas ou sugestões para o nosso grupo do
            WhatsApp:
            <a
              href="https://chat.whatsapp.com/F90jVGBKjL22hFiqOD29iM"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginLeft: 5,
              }}
            >
              https://chat.whatsapp.com/F90jVGBKjL22hFiqOD29iM
            </a>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Section>
  );
}
