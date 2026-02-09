import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UrbanBrik Sense | AI-Powered Real Estate Intelligence",
  description:
    "AI-Powered Rental, Sentiment & Investment Intelligence Engine. A living predictive model for smarter real estate decisions.",
  keywords: [
    "PropTech",
    "AI real estate",
    "rental intelligence",
    "property investment",
    "sentiment analysis",
    "UrbanBrik",
  ],
  openGraph: {
    title: "UrbanBrik Sense | AI-Powered Real Estate Intelligence",
    description:
      "A living predictive model for smarter real estate decisions.",
    type: "website",
    siteName: "UrbanBrik Sense",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
