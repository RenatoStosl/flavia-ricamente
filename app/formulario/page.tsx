import type { Metadata } from "next";
import { ApplicationFormFlow } from "@/components/form/ApplicationFormFlow";

export const metadata: Metadata = {
  title: "Formulário da Mentoria | Flávia RicaMente",
  description: "Formulário de aplicação para a mentoria Flávia RicaMente.",
};

export default function FormularioPage() {
  return <ApplicationFormFlow />;
}
