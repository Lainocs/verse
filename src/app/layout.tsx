import type { Metadata } from "next";
import { Bebas_Neue, Rajdhani } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/cursor/CustomCursor";
import ScrollProgressTracker from "@/components/world/ScrollProgressTracker";
import WorldCanvasLoader from "@/components/world/WorldCanvasLoader";
import ContentLayer from "@/components/content/ContentLayer";

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
    "Portfolio de Nicolas de Garrigues, software engineer — une seule scène continue.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${bebas.variable} ${rajdhani.variable} h-full`}>
      <body className="min-h-full bg-void text-bone antialiased">
        <WorldCanvasLoader />
        <ScrollProgressTracker />
        <ContentLayer />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
