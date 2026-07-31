import type { Metadata } from "next";
import { AgendamentoClient } from "./agendamento-client";

export const metadata: Metadata = {
  title: "Agendamento",
  description:
    "Solicite o agendamento da sua vistoria veicular com a Visão Classe A em Porto Alegre e nas principais cidades do Rio Grande do Sul.",
};

export default function AgendamentoPage() {
  return <AgendamentoClient />;
}
