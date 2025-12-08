import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ["arabic"],
  variable: "--font-amiri"
});

export const metadata: Metadata = {
  title: "Le Noble Coran",
  description: "Lisez le Saint Coran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${amiri.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
