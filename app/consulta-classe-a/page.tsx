import type { Metadata } from "next";
import { ConsultaClasseAClient } from "./consulta-classe-a-client";

export const metadata: Metadata = {
  title: "Consulta Classe A",
  description:
    "Consulte histórico de leilão, sinistro, roubo e furto, restrições e outras informações importantes antes de comprar um veículo.",
};

export default function ConsultaClasseAPage() {
  return <ConsultaClasseAClient />;
}
