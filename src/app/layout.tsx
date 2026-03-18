import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Callao",
  description: "Reserva de mesas - Hotel Aristi, Cali"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-[#080503] text-white antialiased">{children}</body>
    </html>
  );
}

