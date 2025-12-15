import { Metadata } from 'next';

export const metadata: Metadata = {
 title: "Connect With Us | Christ Healing Home Europe",
 description: "Take your next step of faith. Get baptized, share your testimony, request prayer, join a mentorship group, or serve at CHH Europe. Start your journey today.",
 keywords: ["baptism CHH", "church mentorship", "prayer request", "church testimony", "serve at church", "counselling services"],
 openGraph: {
  title: "Connect With CHH Europe",
  description: "Take your next step - baptism, mentorship, prayer, testimony, or service opportunities.",
  url: "https://chheurope.org/connect",
  siteName: "Christ Healing Home Europe",
  locale: "en_GB",
  type: "website",
 },
 twitter: {
  card: "summary_large_image",
  title: "Connect With CHH Europe",
  description: "Take your next step of faith at CHH Europe.",
 },
 alternates: {
  canonical: "https://chheurope.org/connect",
 },
};

export default function ConnectLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
