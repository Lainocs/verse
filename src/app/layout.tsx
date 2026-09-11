import type { Metadata } from "next";
import { Bebas_Neue, Rajdhani } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/cursor/CustomCursor";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NICOLAS DE GARRIGUES // AGENT PROFILE",
  description:
    "Portfolio de Nicolas de Garrigues, software engineer — dossier d'agent tactique.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${bebas.variable} ${rajdhani.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-void text-bone antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
