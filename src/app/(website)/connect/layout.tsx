import { Metadata } from 'next';

export const metadata: Metadata = {
 title: "Connect With Us | Redeemed Pillar of Fire Europe",
 description: "Take your next step of faith. Get baptized, share your testimony, request prayer, join a mentorship group, or serve at RPF Europe. Start your journey today.",
 keywords: ["baptism RPF", "church mentorship", "prayer request", "church testimony", "serve at church", "counselling services"],
 openGraph: {
  title: "Connect With RPF Europe",
  description: "Take your next step - baptism, mentorship, prayer, testimony, or service opportunities.",
  url: "https://RPFeurope.org/connect",
  siteName: "Redeemed Pillar of Fire Europe",
  locale: "en_GB",
  type: "website",
 },
 twitter: {
  card: "summary_large_image",
  title: "Connect With RPF Europe",
  description: "Take your next step of faith at RPF Europe.",
 },
 alternates: {
  canonical: "https://RPFeurope.org/connect",
 },
};

export default function ConnectLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
