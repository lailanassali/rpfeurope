import { Metadata } from 'next';

export const metadata: Metadata = {
 title: "Resources | Christ Healing Home Europe",
 description: "Access devotionals, sermons, and resources from CHH Europe. Grow in your faith with Bright & Morning Star devotionals and powerful teaching materials.",
 keywords: ["CHH resources", "church devotionals", "Christian resources UK", "Bright Morning Star", "sermons"],
 openGraph: {
  title: "Resources | CHH Europe",
  description: "Access devotionals and resources to grow in your faith.",
  url: "https://chheurope.org/resources",
  siteName: "Christ Healing Home Europe",
  locale: "en_GB",
  type: "website",
 },
 twitter: {
  card: "summary_large_image",
  title: "CHH Europe Resources",
  description: "Devotionals and resources for spiritual growth.",
 },
 alternates: {
  canonical: "https://chheurope.org/resources",
 },
};

export default function ResourcesLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
