import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Christ House of Hope - CHH Europe",
  description: "Welcome to Christ House of Hope Europe. A place of worship, community, and spiritual growth.",
  keywords: ["Church", "Ministry", "CHH", "Europe", "Christ House of Hope", "Worship", "Community"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`} style={{ maxWidth: '1800px', margin: '0 auto' }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
