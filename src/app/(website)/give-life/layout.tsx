import { Metadata } from 'next';

export const metadata: Metadata = {
 title: "Give Your Life to Christ | RPF Europe",
 description: "Ready to take the first step? Give your life to Christ or rededicate your heart. Fill out our form and connect with our team who will celebrate with you and guide your new journey in faith.",
 keywords: ["give life to Christ", "accept Jesus", "rededication", "salvation", "new believer RPF"],
 openGraph: {
  title: "Give Your Life to Christ | RPF Europe",
  description: "Take the first step in your faith journey. Connect with our team today.",
  url: "https://RPFeurope.org/give-life",
  siteName: "Redeemed Pillar of Fire Europe",
  locale: "en_GB",
  type: "website",
 },
 twitter: {
  card: "summary_large_image",
  title: "Give Your Life to Christ",
  description: "Start your faith journey with RPF Europe today.",
 },
 alternates: {
  canonical: "https://RPFeurope.org/give-life",
 },
};

export default function GiveLifeLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
