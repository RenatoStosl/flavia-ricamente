import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flávia RicaMente",
  description: "Educação financeira com propósito.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
