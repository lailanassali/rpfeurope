import { Metadata } from 'next';

export const metadata: Metadata = {
 title: "Upcoming Events | Christ Healing Home Europe",
 description: "Discover upcoming events at CHH Europe. From CHH Europe gatherings to youth events, children's ministry, fellowship meetings and campus events - find your next opportunity to connect.",
 keywords: ["CHH events", "church events UK", "youth events", "children ministry events", "campus fellowship", "Christian gathering"],
 openGraph: {
  title: "Upcoming Events | CHH Europe",
  description: "Discover events that bring faith, purpose & community together.",
  url: "https://chheurope.org/events",
  siteName: "Christ Healing Home Europe",
  locale: "en_GB",
  type: "website",
 },
 twitter: {
  card: "summary_large_image",
  title: "CHH Europe Events",
  description: "Join us for upcoming events - faith, purpose & community.",
 },
 alternates: {
  canonical: "https://chheurope.org/events",
 },
};

export default function EventsLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
