import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkiErg Startgruppskalkylator",
  description: "Beräkna startgrupp baserat på 5000m SkiErg-tid, vikt och skidvana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
