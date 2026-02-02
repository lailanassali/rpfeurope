import { Metadata } from 'next';

export const metadata: Metadata = {
 title: "Resources | Redeemed Pillar of Fire Europe",
 description: "Access devotionals, sermons, and resources from RPF Europe. Grow in your faith with Bright & Morning Star devotionals and powerful teaching materials.",
 keywords: ["RPF resources", "church devotionals", "Christian resources UK", "Bright Morning Star", "sermons"],
 openGraph: {
  title: "Resources | RPF Europe",
  description: "Access devotionals and resources to grow in your faith.",
  url: "https://RPFeurope.org/resources",
  siteName: "Redeemed Pillar of Fire Europe",
  locale: "en_GB",
  type: "website",
 },
 twitter: {
  card: "summary_large_image",
  title: "RPF Europe Resources",
  description: "Devotionals and resources for spiritual growth.",
 },
 alternates: {
  canonical: "https://RPFeurope.org/resources",
 },
};

export default function ResourcesLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
