import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import GoogleTranslateBridge from "@/components/providers/GoogleTranslateBridge";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sindh Connect | Living Heritage, Luminaries & Culture of Sindh",
  description: "An authoritative cultural publication and living archive celebrating 5,000 years of Indus civilization, Sufi philosophy, indigenous craftsmanship, visionary leaders, and contemporary creators.",
  metadataBase: new URL("https://sindhconnect.com"),
  openGraph: {
    title: "Sindh Connect | The Soul of the Indus Civilization",
    description: "An authoritative cultural archive documenting Sindh's 5,000-year history, historical luminaries, traditional crafts, and positive community stories.",
    url: "https://sindhconnect.com",
    siteName: "Sindh Connect",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 1200,
        alt: "Sindh Connect Cultural Identity Motif - Map of Sindh with Ajrak geometry",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sindh Connect | Living Heritage & Cultural Archive",
    description: "An authoritative digital archive documenting Sindh's history, luminaries, crafts, and positive transformations.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-parchment text-charcoal font-sans selection:bg-maroon selection:text-parchment">
        <AuthProvider>
          <LanguageProvider>
            <GoogleTranslateBridge />
            <Navbar />
            <main className="flex-grow pt-20 flex flex-col">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
