import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkiErg Kalkylatorer",
  description: "Concept2 SkiErg kalkylatorer för träning och tävling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="bg-gray-950 text-white antialiased font-sans">{children}</body>
    </html>
  );
}
