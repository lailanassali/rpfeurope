import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://chh-app.vercel.app";
const ogImageUrl = new URL("/assets/rpflogo.png", siteUrl).toString();

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: "Redeemed Pillar of Fire - RPF Europe",
	description:
		"Welcome to Redeemed Pillar of Fire Europe. A place of worship, community, and spiritual growth.",
	keywords: [
		"Church",
		"Ministry",
		"RPF",
		"Europe",
		"Redeemed Pillar of Fire",
		"Worship",
		"Community",
	],
	openGraph: {
		title: "Redeemed Pillar of Fire - RPF Europe",
		description:
			"Welcome to Redeemed Pillar of Fire Europe. A place of worship, community, and spiritual growth.",
		images: [
			{
				url: ogImageUrl,
				alt: "Redeemed Pillar of Fire Europe logo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Redeemed Pillar of Fire - RPF Europe",
		description:
			"Welcome to Redeemed Pillar of Fire Europe. A place of worship, community, and spiritual growth.",
		images: [ogImageUrl],
	},
	icons: {
		icon: "/assets/rpflogo.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${montserrat.className}`}
				style={{ maxWidth: "1800px", margin: "0 auto" }}
			>
				{children}
			</body>
		</html>
	);
}
