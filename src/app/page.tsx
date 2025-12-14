import { SectionContent } from "@/components/common/SectionContent";
import { MinistriesCarousel } from "@/components/common/MinistriesCarousel";
import { Link as LinkIcon } from "lucide-react";
import { Metadata } from "next";
import { LocationsCarousel } from "@/components/common/LocationsCarousel";
import { ConnectCarousel } from "@/components/common/ConnectCarousel";
import { CardComponent } from "@/components/common/CardComponent";
import { HeroText } from "@/components/common/HeroText";
import { FinalCTA } from "@/components/common/FinalCTA";


export const metadata: Metadata = {
  title: "Home | Christ House of Hope - CHH Europe",
  description: "Where Worship Meets Community. Join us for worship and fellowship at CHH Europe.",
};

// Location data for Join us for Service carousels
const locations = [
  "Birmingham", "London", "Manchester", "Leeds",
  "Bristol", "Liverpool", "Sheffield", "Newcastle",
  "Nottingham", "Southampton", "Cardiff", "Edinburgh"
];

export default function Home() {
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
              backgroundImage: "linear-gradient(rgba(89, 66, 123, 0.6), rgba(89, 66, 123, 0.6)), url('/assets/hero-worship.jpg')"
            }}
          />

          <HeroText
            heading="Welcome to CHH Europe"
            subtitle="Raising Purposeful Followers for Christ"
            primaryButton={{
              text: "Join our Family",
              href: "/join"
            }}
            secondaryButton={{
              text: "About Us",
              href: "/about"
            }}
          />
        </section>

        {/* 2. Who We Are */}
        <section className="py-24 bg-white">
          <div className="container w-11/12 px-[75px] mx-auto">
            <SectionContent
              heading="Who We Are"
              description="Christ Healing Home (CHH) is a family fully consecrated to Jesus Christ and led by the Holy Spirit. Appointed and ordained to serve, our heart is to glorify God and make His love known to all. We are a globally expanding Pentecostal movement with many branches across the UK and beyond."
              quote="Our mission is to spark and sustain revival, restoring the early church as revealed in the book of Acts - until the return of Christ."
              alignment="left"
              headingSize="medium"
            />
          </div>
        </section>

        {/* 3. Ministries Section */}
        <section className="relative pt-[96px] pb-[194px]" style={{ backgroundColor: "#CEC3DF40" }}>
          <div className="">
            <div className="container w-11/12 px-[75px] mx-auto pb-[96px]">
              <SectionContent
                heading="Ministries"
                description="Christ Healing Home (CHH) is a family fully consecrated to Jesus Christ and led by the Holy Spirit. Appointed and ordained to serve, our heart is to glorify God and make His love known to all."
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
                  image: "/assets/ministry-fellowship.jpg"
                },
                {
                  title: "CHH Children's Ministry",
                  href: "/ministries/children",
                  image: "/assets/ministry-children.jpg"
                },
                {
                  title: "CHH Youth",
                  href: "/ministries/youth",
                  image: "/assets/ministry-youth.jpg"
                },
                {
                  title: "University Fellowships",
                  href: "/ministries/university",
                  image: "/assets/ministry-university.jpg"
                }
              ]}
            />
          </div>
        </section>

        {/* 4. Quote Banner - Positioned absolutely between sections */}
        <div className="relative -mt-16 z-10">
          <div className="container w-11/12 px-4 mx-auto">
            <div className="max-w-full mx-auto bg-[#7F4A19] text-white rounded-2xl py-[76px] px-[48px] text-center shadow-xl">
              <p className="text-[36px] leading-relaxed">
                "We are committed to raising up zealous believers who walk boldly in their God-given callings
                and carry the presence of God wherever they go."
              </p>
            </div>
          </div>
        </div>

        {/* 5. Join us for Service */}
        <section className="pb-24 pt-32 bg-white">
          <div>
            <div className="container w-11/12 mx-auto px-4">
              <SectionContent
                heading="Join us for Service"
                description="Find a location close to you and experience the power of God's presence."
                secondaryButton={{
                  text: "View all locations",
                  href: "/locations",
                  icon: true,
                  isOutline: true
                }}
                alignment="left"
                headingSize="medium"
                className="mb-12"
              />
            </div>

            <LocationsCarousel
              rows={2}
              showIndicators={false}
              items={[
                { location: "Birmingham", image: "/assets/location-1.jpg" },
                { location: "London", image: "/assets/location-2.jpg" },
                { location: "Manchester", image: "/assets/location-3.jpg" },
                { location: "Leeds", image: "/assets/location-4.jpg" },
                { location: "Bristol", image: "/assets/location-5.jpg" },
                { location: "Liverpool", image: "/assets/location-6.jpg" },
                { location: "Sheffield", image: "/assets/location-7.jpg" },
                { location: "Newcastle", image: "/assets/location-8.jpg" },
                { location: "Nottingham", image: "/assets/location-9.jpg" },
                { location: "Southampton", image: "/assets/location-10.jpg" },
                { location: "Cardiff", image: "/assets/location-11.jpg" },
                { location: "Edinburgh", image: "/assets/location-12.jpg" }
              ]}
            />
          </div>
        </section>

        {/* 6. Upcoming at Christ House of Hope */}
        <section className="bg-primary text-white py-24">
          <div className="container w-11/12 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="w-[90%]">
                <SectionContent
                  heading="Upcoming at Christ Healing Home"
                  secondaryButton={{ text: "Join an Event", href: "/events", icon: true, isOutline: true }}
                  alignment="left"
                  textColor="white"
                  headingSize="large"
                />
              </div>

              {/* Event Card */}
              <div className="relative h-[542px] rounded-2xl overflow-hidden group cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundColor: "#F3F4F6",
                    backgroundImage: "url('/assets/event-convention.jpg')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">Annual Convention</h3>
                      {/* <p className="text-white/80 text-lg">Main Auditorium, London</p> */}
                    </div>
                    <LinkIcon className="size-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Connect Section */}
        <section className="py-24 bg-white">
          <div className="container w-11/12 mx-auto px-4">
            <SectionContent
              heading="Connect"
              description="Christ Healing Home (CHH) is a family fully consecrated to Jesus Christ and led by the Holy Spirit. Appointed and ordained to serve, our heart is to glorify God and make His love known to all."
              alignment="left"
              headingSize="medium"
            />
            <ConnectCarousel
              items={[
                {
                  title: "Baptism",
                  description: "Our baptism services provide a welcoming environment for individuals to publicly declare their commitment to Jesus.",
                  image: "/assets/connect-1.jpg",
                  linkHref: '/baptism'
                },
                {
                  title: "Join a Department",
                  description: "Discover the joy of serving in various departments of our church.",
                  image: "/assets/connect-2.jpg",
                  linkHref: '/'
                },
                {
                  title: "Mentorship Groups",
                  description: "Grow in faith together with our mentorship program.",
                  image: "/assets/connect-3.jpg",
                  linkHref: '/'
                }
              ]}
            />
          </div>
        </section>

        {/* 8. Bright & Morning Star */}
        <section className="py-24">
          <div className="container w-11/12 mx-auto px-4">
            <div className="mb-14">
              <SectionContent
                heading="Bright & Morning Star"
                description="Resources and insights to strengthen your walk with God"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Faith in Action", description: "Discover how faith transforms everyday life and empowers believers.", linkText: "Join live stream", linkHref: "/resources" },
                { title: "Power of Prayer", category: "Upcoming", description: "Learn about the transformative power of consistent prayer life.", linkText: "Get Volume 1", linkHref: "/resources" },
                { title: "Walking in Purpose", description: "Understanding and fulfilling your God-given calling and purpose.", linkText: "Read More", linkHref: "/resources" }
              ].map((item, i) => (
                <CardComponent
                  key={i}
                  image="/assets/ministry.jpg"
                  title={item.title}
                  linkText={item.linkText}
                  description={item.description}
                  textBgColor="#ffffff"
                  badge={item.category ? {
                    title: item.category,
                    bgColor: "#E1A063",
                    textColor: "#FFFFFF"
                  } : undefined}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 9. Final CTA Section */}
        <FinalCTA />
      </main>
    </div>
  );
}
