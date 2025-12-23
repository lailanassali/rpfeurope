import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
 subsets: ["latin"],
 variable: "--font-montserrat",
});

export const metadata: Metadata = {
 title: "Christ Healing Home - CHH Europe",
 description: "Welcome to Christ Healing Home Europe. A place of worship, community, and spiritual growth.",
 keywords: ["Church", "Ministry", "CHH", "Europe", "Christ Healing Home", "Worship", "Community"],
 icons: {
  icon: '/assets/rpflogo.png',
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body className={`${montserrat.className}`} style={{ maxWidth: '1800px', margin: '0 auto' }}>
    {children}
   </body>
  </html>
 );
}
