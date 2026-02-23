import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
});

export const metadata: Metadata = {
	// metadataBase: new URL("https://rpfeurope.org"),
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
		images: ["/assets/rpflogo.png"],
	},
	twitter: {
		card: "summary",
		title: "Redeemed Pillar of Fire - RPF Europe",
		description:
			"Welcome to Redeemed Pillar of Fire Europe. A place of worship, community, and spiritual growth.",
		images: ["/assets/rpflogo.png"],
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
