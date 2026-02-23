import { SectionContent } from "@/components/common/SectionContent";
import { MinistriesCarousel } from "@/components/common/MinistriesCarousel";
import { Metadata } from "next";
import { LocationsCarousel } from "@/components/common/LocationsCarousel";
import { ConnectCarousel } from "@/components/common/ConnectCarousel";
import { HeroText } from "@/components/common/HeroText";
import { FinalCTA } from "@/components/common/FinalCTA";
import { supabaseAdmin } from "@/lib/supabase";
import { UpcomingEventCard } from "@/components/common/UpcomingEventCard";
import { BMSResourcesSection } from "@/components/common/BMSResourcesSection";
import { getHeroImage, getCarouselImages, getConnectTabImages } from "@/lib/image-utils";
import { CONNECT_TABS_DATA } from "@/lib/connect-data";
import { Location, slugify } from "@/lib/location-utils";
import { FindNearestButton } from "@/components/common/FindNearestButton";


export const metadata: Metadata = {
  title: "Redeemed Pillar of Fire Europe | Where Worship Meets Community",
  description: "Join RPF Europe - a globally expanding Pentecostal movement raising purposeful followers for Christ. Experience transformative worship, fellowship, and spiritual growth across our UK branches.",
  keywords: ["Redeemed Pillar of Fire", "RPF Europe", "Pentecostal church UK", "Christian worship", "church community", "spiritual growth", "fellowship"],
  openGraph: {
    title: "Redeemed Pillar of Fire Europe | Where Worship Meets Community",
    description: "Join RPF Europe - a globally expanding Pentecostal movement raising purposeful followers for Christ.",
    url: "https://RPFeurope.org",
    siteName: "Redeemed Pillar of Fire Europe",
    locale: "en_GB",
    type: "website",
    images: ["/assets/rpflogo.png"],
  },
  twitter: {
    card: "summary_large_image",
    description: "Where Worship Meets Community - Join us for transformative worship and fellowship.",
    images: ["/assets/rpflogo.png"],
  },
  alternates: {
    canonical: "https://RPFeurope.org",
  },
};

// Force dynamic rendering to ensure fresh data fetch on every request
export const dynamic = 'force-dynamic';

// Fetch locations from database
async function getLocations(): Promise<Partial<Location>[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('locations')
      .select('name, image_url')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching locations:', error);
      return [];
    }

    return (data || []) as Partial<Location>[];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

export default async function Home() {
  const locations = await getLocations();

  // Fetch images from database
  const homeHeroImage = await getHeroImage('home_hero');
  const ministriesImages = await getCarouselImages('ministries_carousel');
  const connectImages = await getConnectTabImages();
  const finalCTAImage = await getHeroImage('home_bottom_hero');

  // Transform locations for carousel
  const carouselItems = locations.map(loc => ({
    location: loc.name || '',
    image: loc.image_url || '',
    slug: slugify(loc.name || '')
  }));
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
              backgroundImage: homeHeroImage
                ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${homeHeroImage}')`
                : "#382a4dff"
            }}
          />

          <HeroText
            heading="Welcome to RPF Europe"
            subtitle="Raising Purposeful Followers for Christ"
            primaryButton={{
              text: "Join our Family",
              href: "/join-service"
            }}
            secondaryButton={{
              text: "About Us",
              href: "/about"
            }}
          />
        </section>

        {/* 2. Who We Are */}
        <section className="py-12 md:py-20 lg:py-24 bg-white">
          <div className="container w-full px-4 sm:w-11/12 sm:px-8 md:px-12 lg:px-[75px] mx-auto">
            <SectionContent
              heading="Who We Are"
              description="Redeemed Pillar of Fire (RPF) is a family fully consecrated to Jesus Christ and led by the Holy Spirit. Appointed and ordained to serve, our heart is to glorify God and make His love known to all. We are a globally expanding Pentecostal movement with many branches across the UK and beyond."
              quote="Our mission is to spark and sustain revival, restoring the early church as revealed in the book of Acts - until the return of Christ."
              alignment="left"
              headingSize="medium"
            />
          </div>
        </section>

        {/* 3. Ministries Section */}
        <section className="relative pt-12 md:pt-16 lg:pt-[96px] pb-24 md:pb-32 lg:pb-[194px]" style={{ backgroundColor: "#CEC3DF40" }}>
          <div className="">
            <div className="container w-full px-4 sm:w-11/12 sm:px-8 md:px-12 lg:px-[75px] mx-auto pb-12 md:pb-16 lg:pb-[96px]">
              <SectionContent
                heading="Ministries"
                description="Redeemed Pillar of Fire (RPF) is a family fully consecrated to Jesus Christ and led by the Holy Spirit. Appointed and ordained to serve, our heart is to glorify God and make His love known to all."
                alignment="left"
                headingSize="medium"
              />
            </div>

            {/* Carousel Component */}
            <MinistriesCarousel
              items={[
                {
                  title: "Men's and Women's Fellowship",
                  href: "/ministries/fellowship",
                  image: ministriesImages[0] || ""
                },
                {
                  title: "RPF Children's Ministry",
                  href: "/ministries/children",
                  image: ministriesImages[1] || ""
                },
                {
                  title: "RPF Youth",
                  href: "/ministries/youth",
                  image: ministriesImages[2] || ""
                },
                {
                  title: "University Fellowships",
                  href: "/ministries/university",
                  image: ministriesImages[3] || ""
                }
              ]}
            />
          </div>
        </section>

        {/* 4. Quote Banner - Positioned absolutely between sections */}
        <div className="relative -mt-8 md:-mt-12 lg:-mt-16 z-10">
          <div className="container w-full px-4 sm:w-11/12 mx-auto">
            <div className="max-w-full mx-auto bg-[#7F4A19] text-white rounded-lg md:rounded-2xl py-8 md:py-12 lg:py-[76px] px-6 md:px-8 lg:px-[48px] text-center shadow-xl">
              <p className="text-xl md:text-2xl lg:text-[36px] leading-relaxed">
                "We are committed to raising up zealous believers who walk boldly in their God-given callings
                and carry the presence of God wherever they go."
              </p>
            </div>
          </div>
        </div>

        {/* 5. Join us for Service */}
        <section className="pb-12 md:pb-20 lg:pb-24 pt-16 md:pt-24 lg:pt-32 bg-white">
          <div>
            <div className="container w-full px-4 sm:w-11/12 mx-auto">
              <SectionContent
                heading="Join us for Service"
                description="Always wondered what a Redeemed Pillar of Fire (RPF) service is like? Come and find out. Whether you’re just curious, seeking answers or hungry for more of God, you’re welcome here — a place where lives are transformed by the power and presence of Jesus Christ."
                secondaryButton={{
                  text: "View all locations",
                  href: "/join-service",
                  icon: true,
                  isOutline: true
                }}
                alignment="left"
                headingSize="medium"
                className="mb-12"
              />
            </div>

            {carouselItems.length > 0 ? (
              <LocationsCarousel
                rows={carouselItems.length > 8 ? 2 : 1}
                showIndicators={false}
                items={carouselItems}
              />
            ) : (
              <div className="container w-11/12 mx-auto px-4 text-center text-gray-500">
                No locations available at the moment.
              </div>
            )}
          </div>
        </section>

        {/* 6. Upcoming at Redeemed Pillar of Fire */}
        <section className="bg-primary text-white py-12 md:py-20 lg:py-24">
          <div className="container w-full px-4 sm:w-11/12 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className="w-full md:w-[90%]">
                <SectionContent
                  heading="Upcoming at Redeemed Pillar of Fire"
                  secondaryButton={{ text: "Find out more", href: "/events", icon: true, isOutline: true }}
                  alignment="left"
                  textColor="white"
                  headingSize="large"
                />
              </div>

              {/* Event Card */}
              <UpcomingEventCard />
            </div>
          </div>
        </section>

        {/* 7. Connect Section */}
        <section className="py-12 md:py-20 lg:py-24 bg-white">
          <div className="container w-full px-4 sm:w-11/12 mx-auto">
            <SectionContent
              heading="Connect"
              description="Redeemed Pillar of Fire (RPF) is a family fully consecrated to Jesus Christ and led by the Holy Spirit. Appointed and ordained to serve, our heart is to glorify God and make His love known to all."
              alignment="left"
              headingSize="medium"
            />
            <ConnectCarousel
              items={CONNECT_TABS_DATA.map(tab => ({
                title: tab.title,
                description: tab.description[tab.description.length - 1],
                image: connectImages[tab.id] || "",
                linkHref: `/connect?tab=${tab.id}`
              }))}
            />
          </div>
        </section>

        {/* 8. Bright & Morning Star */}
        <section className="py-12 md:py-20 lg:py-24">
          <div className="container w-full px-4 sm:w-11/12 mx-auto">
            <div className="mb-14">
              <SectionContent
                heading="Bright & Morning Star"
                description="A 365-Day Journey of Faith and Renewal - The Bright & Morning Star invites you on a transformative journey with God. "
                secondaryButton={{
                  text: "View all resources",
                  href: "/resources",
                  icon: true,
                  isOutline: true
                }}
                alignment="left"
                headingSize="medium"
                className="mb-12"
              />
            </div>

            <BMSResourcesSection />
          </div>
        </section>

        {/* 9. Final CTA Section */}
        <FinalCTA
          backgroundImage={finalCTAImage}
          primaryButtonComponent={<FindNearestButton />}
        />
      </main>
    </div>
  );
}
