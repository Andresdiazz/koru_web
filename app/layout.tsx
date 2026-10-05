import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@/components/layout/Analytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { sitio } from "@/content/sitio";
import { JsonLd, jsonLdClub } from "@/lib/seo";
import "./globals.css";

// Fuentes variables: un solo archivo cubre los pesos que usamos (300/400 y 400/500).
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

// La itálica se usa en pocos lugares: no se precarga para no competir con la imagen principal.
const cormorantItalica = Cormorant_Garamond({
  variable: "--font-cormorant-italica",
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: {
    default: "KORU · Club de bienestar con piscina terapéutica en Cali",
    template: "%s · KORU",
  },
  description: sitio.descripcion,
  applicationName: "KORU",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "KORU",
    url: "/",
    images: [{ url: "/images/og-koru.jpg", width: 1200, height: 630, alt: "KORU · Club de bienestar con piscina terapéutica en Cali" }],
  },
  formatDetection: { telephone: false },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#2c1a0e",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${cormorant.variable} ${cormorantItalica.variable} ${dmSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
          <Header />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>
        <JsonLd data={jsonLdClub()} />
        <Analytics />
      </body>
    </html>
  );
}
