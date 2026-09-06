import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bloom Advisory — Less busywork. More possibility.",
  description:
    "Practical AI, automation, integration, and analytics for small and mid-sized businesses. Find a clearer way to work with Bloom Advisory.",
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
