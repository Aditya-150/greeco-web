import type { Metadata } from "next";
import { Raleway, Roboto } from "next/font/google";

import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-main",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "GreecoMart",
  description: "Empowering Sustainable Choices for Businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
