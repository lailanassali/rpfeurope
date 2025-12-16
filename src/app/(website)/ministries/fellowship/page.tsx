import { Metadata } from "next";
import { HeroText } from "@/components/common/HeroText";
import { FinalCTA } from "@/components/common/FinalCTA";
import { CardComponent } from "@/components/common/CardComponent";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getHeroImage, getCarouselImages } from "@/lib/image-utils";

export const metadata: Metadata = {
        title: "Men & Women's Fellowship | Christ Healing Home",
        description:
                "A home for everyone seeking God's presence, growing in faith, and walking in purpose.",
};

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export default async function FellowshipPage() {
        // Fetch images from database
        const fellowshipHero = await getHeroImage('fellowship_hero');
        const fellowshipActivities = await getCarouselImages('fellowship_activities');
        const fellowshipCTA = await getHeroImage('fellowship_cta');

        return (
                <div className="w-full flex min-h-screen flex-col font-sans">
                        <main className="flex-1">
                                {/* 1. Hero Section */}
                                <section className="relative h-[700px] w-full flex items-end overflow-hidden">
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
                                                heading="CHH Men & Women's Fellowship"
                                                subtitle="A home for everyone seeking God's presence, growing in faith, and walking in purpose."
                                                primaryButton={{
                                                        text: "Join Our Ministry",
                                                        href: "/connect",
                                                }}
                                        />
                                </section>

                                {/* 2. Strength in Fellowship Section */}
                                <section
                                        style={{ paddingTop: "120px", paddingBottom: "120px" }}
                                        className="bg-white"
                                >
                                        <div className="container w-11/12 mx-auto px-4">
                                                <h2
                                                        className="text-[48px] font-bold mb-6 text-left"
                                                        style={{ color: "#111111" }}
                                                >
                                                        Strength in Fellowship
                                                </h2>
                                                <p className="text-[20px] text-left" style={{ color: "#373737" }}>
                                                        At Christ Healing Home, our Men's and Women's Fellowships (ages 35
                                                        and above) are refreshing gatherings where believers come together
                                                        to deepen in their walk with Christ and strengthen one another in
                                                        faith.
                                                </p>
                                        </div>
                                </section>

                                {/* 3. Worship With Us Section */}
                                <section
                                        style={{
                                                backgroundColor: "#FFFFFF",
                                                paddingTop: "104px",
                                                paddingBottom: "104px",
                                        }}
                                >
                                        <div className="container w-11/12 mx-auto px-4">
                                                <div className="flex items-center" style={{ gap: "82px" }}>
                                                        {/* Text - left */}
                                                        <div className="flex-3 text-left">
                                                                <h2
                                                                        className="text-[48px] font-bold mb-6"
                                                                        style={{ color: "#111111" }}
                                                                >
                                                                        Worship with us
                                                                </h2>
                                                                <div
                                                                        className="text-[20px] whitespace-pre-line"
                                                                        style={{ color: "#373737" }}
                                                                >
                                                                        {`Our gatherings take place every fortnight for bible study, fellowship, prayer and building godly friendships. Here, believers feel renewed, encouraged and empowered through the word.

Each gathering is built on a foundation of love and encouragement where everyone is valued and equipped to grow in faith.`}
                                                                </div>
                                                        </div>

                                                        {/* Image with Glass Overlay - right */}
                                                        <div className="flex-2 flex items-center justify-center relative">
                                                                {/* Main Image */}
                                                                <div
                                                                        className=" w-full overflow-hidden rounded-lg"
                                                                        style={{
                                                                                height: "352px",
                                                                                backgroundImage: fellowshipActivities[0]
                                                                                        ? `url('${fellowshipActivities[0]}')`
                                                                                        : "none",
                                                                                backgroundSize: "cover",
                                                                                backgroundPosition: "center",
                                                                        }}
                                                                >
                                                                        {/* Glass Overlay Card */}
                                                                        <div
                                                                                className="absolute w-full"
                                                                                style={{ top: "32px", right: "32px", zIndex: 10 }}
                                                                        >
                                                                                <div
                                                                                        style={{
                                                                                                backgroundColor: "#866AAF40",
                                                                                                backdropFilter: "blur(10px)",
                                                                                                WebkitBackdropFilter: "blur(10px)",
                                                                                                padding: "32px",
                                                                                                borderRadius: "16px",
                                                                                                width: "100%", height: '352px'
                                                                                        }}
                                                                                >
                                                                                        <h3 className="text-[32px] font-bold text-white mb-6">
                                                                                                Bi-Weekly Gatherings
                                                                                        </h3>

                                                                                        {/* Time */}
                                                                                        <div className="flex items-center gap-3 mb-4">
                                                                                                <Clock className="size-5 text-white" />
                                                                                                <span className="text-white text-lg">
                                                                                                        Every 2 Weeks
                                                                                                </span>
                                                                                        </div>

                                                                                        {/* Location */}
                                                                                        <div className="flex items-start gap-3 mb-8">
                                                                                                <MapPin className="size-5 text-white mt-1 shrink-0" />
                                                                                                <span className="text-white text-lg">
                                                                                                        Various CHH Locations
                                                                                                </span>
                                                                                        </div>

                                                                                        {/* Button */}
                                                                                        <Link href="/branches">
                                                                                                <button
                                                                                                        className="flex items-center justify-center gap-2 text-white font-semibold transition-all hover:opacity-90 px-6"
                                                                                                        style={{
                                                                                                                backgroundColor: "#59427B",
                                                                                                                height: "54px",
                                                                                                                borderRadius: "4px",
                                                                                                                width: "100%",
                                                                                                        }}
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
                                        <div
                                                className="container w-11/12 mx-auto px-4"
                                                style={{ paddingTop: "80px", paddingBottom: "80px" }}
                                        >
                                                <p
                                                        className="text-center"
                                                        style={{
                                                                fontSize: "36px",
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
                                <section className="py-24 bg-white">
                                        <div className="container w-11/12 mx-auto px-4">
                                                <div className="flex items-start gap-8 mb-20">
                                                        <div className="flex-1">
                                                                <h2
                                                                        className="text-[48px] font-bold"
                                                                        style={{ color: "#111111" }}
                                                                >
                                                                        The Bright & Morning Star Live Sessions
                                                                </h2>
                                                        </div>
                                                        <div className="flex-1">
                                                                <div
                                                                        className="text-[20px] whitespace-pre-line"
                                                                        style={{ color: "#373737" }}
                                                                >
                                                                        {`Join us live as we pray, read and dive into God's Word together — with moments of prophetic insight, dream interpretation and divine revelation that will set your spirit on fire.

We've watched God move powerfully in every session — healing hearts, answering prayers and transforming lives all over the globe. From every nation and every time zone, people are tuning in to seek the Lord - and you're invited.`}
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* 6. Cards Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                        <CardComponent
                                                                image={fellowshipActivities[0] || ""}
                                                                title="Faith in Action"
                                                                description="Discover how faith transforms everyday life and empowers believers."
                                                                linkText="Join live stream"
                                                                linkHref="/resources"
                                                                textBgColor="#ffffff"
                                                        />
                                                        <CardComponent
                                                                image={fellowshipActivities[1] || ""}
                                                                title="Power of Prayer"
                                                                description="Learn about the transformative power of consistent prayer life."
                                                                linkText="Get Volume 1"
                                                                linkHref="/resources"
                                                                textBgColor="#ffffff"
                                                                badge={{
                                                                        title: "Upcoming",
                                                                        bgColor: "#E1A063",
                                                                        textColor: "#FFFFFF",
                                                                }}
                                                        />
                                                        <CardComponent
                                                                image={fellowshipActivities[2] || ""}
                                                                title="Walking in Purpose"
                                                                description="Understanding and fulfilling your God-given calling and purpose."
                                                                linkText="Read More"
                                                                linkHref="/resources"
                                                                textBgColor="#ffffff"
                                                        />
                                                </div>
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
