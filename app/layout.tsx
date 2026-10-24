import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sindh Connect | Editorial Archive of Sindhi Heritage, Luminaries & Culture",
  description: "An authoritative cultural publication and living archive celebrating 5,000 years of Indus civilization, Sufi philosophy, indigenous craftsmanship, visionary leaders, and contemporary creators.",
  metadataBase: new URL("https://sindhconnect.com"),
  openGraph: {
    title: "Sindh Connect | Editorial Cultural Archive & Magazine",
    description: "Discover 5,000 years of Indus civilization, Sufi mysticism, historical luminaries, and modern creators.",
    url: "https://sindhconnect.com",
    siteName: "Sindh Connect",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sindh Connect | The Soul of the Indus",
    description: "An authoritative digital archive documenting Sindh's history, luminaries, and positive transformations.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
            <Navbar />
            <main className="flex-grow pt-20 flex flex-col">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
