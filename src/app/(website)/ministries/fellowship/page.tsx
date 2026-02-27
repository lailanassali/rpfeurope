import { Metadata } from "next";
import { HeroText } from "@/components/common/HeroText";
import { FinalCTA } from "@/components/common/FinalCTA";
import { BMSResourcesSection } from "@/components/common/BMSResourcesSection";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getHeroImage } from "@/lib/image-utils";

export const metadata: Metadata = {
        title: "Men & Women's Fellowship | Redeemed Pillar of Fire",
        description:
                "A home for everyone seeking God's presence, growing in faith, and walking in purpose.",
};

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export default async function FellowshipPage() {
        // Fetch images from database
        const fellowshipHero = await getHeroImage('fellowship_hero');
        const fellowshipWorship = await getHeroImage('fellowship_worship');
        const fellowshipCTA = await getHeroImage('fellowship_cta');

        return (
                <div className="w-full flex min-h-screen flex-col font-sans">
                        <main className="flex-1">
                                {/* 1. Hero Section */}
                                <section className="relative h-[400px] md:h-[600px] lg:h-[700px] w-full flex items-end overflow-hidden">
                                        {/* Background with overlay */}
                                        <div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{
                                                        backgroundColor: "#382a4dff",
                                                        backgroundImage: fellowshipHero
                                                                ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${fellowshipHero}')`
                                                                : "#382a4dff",
                                                }}
                                        />
                                        <HeroText
                                                heading="RPF Men & Women's Fellowship"
                                                subtitle="A home for everyone seeking God's presence, growing in faith, and walking in purpose."
                                                primaryButton={{
                                                        text: "Join Our Ministry",
                                                        href: "/connect",
                                                }}
                                        />
                                </section>

                                {/* 2. Strength in Fellowship Section */}
                                <section className="bg-white py-16 md:py-[120px]">
                                        <div className="container w-11/12 mx-auto px-4">
                                                <h2
                                                        className="text-2xl md:text-[48px] font-bold mb-6 text-left"
                                                        style={{ color: "#111111" }}
                                                >
                                                        Strength in Fellowship
                                                </h2>
                                                <p className="md:text-[20px] text-left" style={{ color: "#373737" }}>
                                                        At Redeemed Pillar of Fire, our Men's and Women's Fellowships (ages 35
                                                        and above) are refreshing gatherings where believers come together
                                                        to deepen in their walk with Christ and strengthen one another in
                                                        faith.
                                                </p>
                                        </div>
                                </section>

                                {/* 3. Worship With Us Section */}
                                <section className="bg-white pb-16 md:py-[104px]">
                                        <div className="container w-11/12 mx-auto px-4">
                                                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[82px]">
                                                        {/* Text - left */}
                                                        <div className="flex-1 text-left w-full">
                                                                <h2
                                                                        className="text-2xl md:text-[48px] font-bold mb-6"
                                                                        style={{ color: "#111111" }}
                                                                >
                                                                        Worship with us
                                                                </h2>
                                                                <div
                                                                        className="md:text-[20px] whitespace-pre-line"
                                                                        style={{ color: "#373737" }}
                                                                >
                                                                        {`Our gatherings take place every fortnight for bible study, fellowship, prayer and building godly friendships. Here, believers feel renewed, encouraged and empowered through the word.

Each gathering is built on a foundation of love and encouragement where everyone is valued and equipped to grow in faith.`}
                                                                </div>
                                                        </div>

                                                        {/* Image with Glass Overlay - right */}
                                                        <div className="flex-1 w-full flex items-center justify-center relative mt-8 lg:mt-0">
                                                                {/* Main Image */}
                                                                <div
                                                                        className=" w-full overflow-hidden rounded-lg"
                                                                        style={{
                                                                                height: "352px",
                                                                                backgroundImage: fellowshipWorship
                                                                                        ? `url('${fellowshipWorship}')`
                                                                                        : "none",
                                                                                backgroundSize: "cover",
                                                                                backgroundPosition: "center",
                                                                        }}
                                                                >
                                                                        {/* Glass Overlay Card */}
                                                                        <div className="relative lg:absolute w-[95%] lg:w-[110%] mx-auto md:-mt-16 lg:mt-0 lg:-left-12 lg:top-8 z-10 px-4 lg:px-0 top-8">
                                                                                <div
                                                                                        className="p-6 md:p-8 rounded-2xl w-full"
                                                                                        style={{
                                                                                                backgroundColor: "#866AAF40",
                                                                                                backdropFilter: "blur(10px)",
                                                                                                WebkitBackdropFilter: "blur(10px)",
                                                                                        }}
                                                                                >
                                                                                        <h3 className="text-xl md:text-[32px] font-bold text-white mb-6">
                                                                                                Bi-Weekly Gatherings
                                                                                        </h3>

                                                                                        {/* Time */}
                                                                                        <div className="flex items-center gap-3 mb-4">
                                                                                                <Clock className="size-5 text-white" />
                                                                                                <span className="text-white text-base md:text-lg">
                                                                                                        Every 2 Weeks
                                                                                                </span>
                                                                                        </div>

                                                                                        {/* Location */}
                                                                                        <div className="flex items-start gap-3 mb-8">
                                                                                                <MapPin className="size-5 text-white mt-1 shrink-0" />
                                                                                                <span className="text-white text-base md:text-lg">
                                                                                                        Various RPF Locations
                                                                                                </span>
                                                                                        </div>

                                                                                        {/* Button */}
                                                                                        <Link href="/branches">
                                                                                                <button
                                                                                                        className="flex items-center justify-center gap-2 text-white font-semibold transition-all hover:opacity-90 px-6 h-[48px] md:h-[54px] w-full rounded-md"
                                                                                                        style={{ backgroundColor: "#59427B" }}
                                                                                                >
                                                                                                        <span>Find a Location</span>
                                                                                                        <ArrowRight className="size-5" />
                                                                                                </button>
                                                                                        </Link>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </section>

                                {/* 4. Quote Section */}
                                <section style={{ backgroundColor: "#F7E7D840" }} className="w-full">
                                        <div className="container w-11/12 mx-auto px-4 py-12 md:py-[80px]">
                                                <p
                                                        className="text-center text-xl md:text-[36px]"
                                                        style={{
                                                                color: "#A25F20",
                                                                lineHeight: "1.5",
                                                        }}
                                                >
                                                        "There's no better way to start and end your day than in His
                                                        presence!."
                                                </p>
                                        </div>
                                </section>

                                {/* 5. Bright & Morning Star Live Sessions Section */}
                                <section className="py-16 md:py-24 bg-white">
                                        <div className="container w-11/12 mx-auto px-4">
                                                <div className="flex flex-col lg:flex-row items-start gap-8 mb-12 lg:mb-20">
                                                        <div className="flex-1 w-full">
                                                                <h2
                                                                        className="text-2xl md:text-[48px] font-bold"
                                                                        style={{ color: "#111111" }}
                                                                >
                                                                        The Bright & Morning Star Live Sessions
                                                                </h2>
                                                        </div>
                                                        <div className="flex-1 w-full">
                                                                <div
                                                                        className="md:text-[20px] whitespace-pre-line"
                                                                        style={{ color: "#373737" }}
                                                                >
                                                                        {`Join us live as we pray, read and dive into God's Word together — with moments of prophetic insight, dream interpretation and divine revelation that will set your spirit on fire.

We've watched God move powerfully in every session — healing hearts, answering prayers and transforming lives all over the globe. From every nation and every time zone, people are tuning in to seek the Lord - and you're invited.`}
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* 6. Cards Grid */}
                                                <BMSResourcesSection />
                                        </div>
                                </section>

                                {/* 7. Final CTA Section */}
                                <FinalCTA
                                        heading="Stay Connected and Grow With Us"
                                        subtitle="Faith grows best in community. Whether you're near one of our branches or joining online, there are many ways to stay connected and be part of what God is doing through RPF Europe."
                                        primaryButtonText="Join Our Ministry"
                                        primaryButtonHref="/connect"
                                        backgroundColor="#FFFFFF"
                                        backgroundImage={fellowshipCTA}
                                />
                        </main>
                </div>
        );
}
