import { Metadata } from 'next';

export const metadata: Metadata = {
 title: "Give Your Life to Christ | CHH Europe",
 description: "Ready to take the first step? Give your life to Christ or rededicate your heart. Fill out our form and connect with our team who will celebrate with you and guide your new journey in faith.",
 keywords: ["give life to Christ", "accept Jesus", "rededication", "salvation", "new believer CHH"],
 openGraph: {
  title: "Give Your Life to Christ | CHH Europe",
  description: "Take the first step in your faith journey. Connect with our team today.",
  url: "https://chheurope.org/give-life",
  siteName: "Christ Healing Home Europe",
  locale: "en_GB",
  type: "website",
 },
 twitter: {
  card: "summary_large_image",
  title: "Give Your Life to Christ",
  description: "Start your faith journey with CHH Europe today.",
 },
 alternates: {
  canonical: "https://chheurope.org/give-life",
 },
};

export default function GiveLifeLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
