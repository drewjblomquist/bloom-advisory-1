import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bloom Advisory — Less busywork. More possibility.",
  description:
    "Practical AI, automation, integration, and analytics for small and mid-sized businesses. Find a clearer way to work with Bloom Advisory.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bloom = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-bloom",
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${bloom.variable}`}>
        {children}
      </body>
    </html>
  );
}
