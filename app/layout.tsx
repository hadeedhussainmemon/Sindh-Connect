import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AuthProvider from "@/components/providers/AuthProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sindh Connect | Heritage, Culture, Icons & Positive Stories",
  description: "The premier digital portal celebrating Sindh's 5,000-year heritage, Sufi legacy, visionary leaders, digital creators, and positive community triumphs.",
  metadataBase: new URL("https://sindhconnect.com"),
  openGraph: {
    title: "Sindh Connect - The Heart & Soul of the Indus",
    description: "Discover Sindh's rich 5,000-year civilization, inspiring personalities, cultural landmarks, and positive achievements.",
    url: "https://sindhconnect.com",
    siteName: "Sindh Connect",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sindh Connect - Heritage, Leaders & Creators",
    description: "Celebrating Sindh's heritage, iconic creators, leaders, and uplifting positive stories.",
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
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#090305] text-[#f9f5f0] font-sans selection:bg-[#d4af37] selection:text-[#090305]">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-16 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
