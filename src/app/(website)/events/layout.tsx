import { Metadata } from 'next';

export const metadata: Metadata = {
 title: "Upcoming Events | Redeemed Pillar of Fire Europe",
 description: "Discover upcoming events at RPF Europe. From RPF Europe gatherings to youth events, children's ministry, fellowship meetings and campus events - find your next opportunity to connect.",
 keywords: ["RPF events", "church events UK", "youth events", "children ministry events", "campus fellowship", "Christian gathering"],
 openGraph: {
  title: "Upcoming Events | RPF Europe",
  description: "Discover events that bring faith, purpose & community together.",
  url: "https://RPFeurope.org/events",
  siteName: "Redeemed Pillar of Fire Europe",
  locale: "en_GB",
  type: "website",
 },
 twitter: {
  card: "summary_large_image",
  title: "RPF Europe Events",
  description: "Join us for upcoming events - faith, purpose & community.",
 },
 alternates: {
  canonical: "https://RPFeurope.org/events",
 },
};

export default function EventsLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
