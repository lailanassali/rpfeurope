import { Metadata } from "next";
import { HeroText } from "@/components/common/HeroText";
import { ImageTextSection } from "@/components/common/ImageTextSection";
import { SectionContent } from "@/components/common/SectionContent";
import { FinalCTA } from "@/components/common/FinalCTA";
import { ServiceLocationCard } from "@/components/common/ServiceLocationCard";
import { getHeroImage, getCarouselImages } from "@/lib/image-utils";

export const metadata: Metadata = {
     title: "University Fellowships | Christ Healing Home",
     description: "A place where students grow in faith, build lasting friendships, and live boldly for Christ.",
};

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

// Sample campus data (images will be fetched externally)
const campuses = [
     {
          slug: "university-of-london",
          title: "University of London",
          services: ["Weekly Fellowship - Every Wednesday | 6:00 PM"],
          address: "Student Union, Room 204, London",
          image: "",
          mapLink: "https://maps.google.com/?q=University+of+London"
     },
     {
          slug: "university-of-manchester",
          title: "University of Manchester",
          services: ["Weekly Fellowship - Every Thursday | 7:00 PM"],
          address: "Student Center, Manchester",
          image: "",
          mapLink: "https://maps.google.com/?q=University+of+Manchester"
     },
     {
          slug: "university-of-birmingham",
          title: "University of Birmingham",
          services: ["Weekly Fellowship - Every Tuesday | 6:30 PM"],
          address: "Guild of Students, Birmingham",
          image: "",
          mapLink: "https://maps.google.com/?q=University+of+Birmingham"
     }
];

export default async function UniversityPage() {
     // Fetch images from database
     const universityHero = await getHeroImage('university_hero');
     const universityActivities = await getCarouselImages('university_activities');
     const universityCTA = await getHeroImage('university_cta');
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
                                   backgroundImage: universityHero ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${universityHero}')` : "#382a4dff"
                              }}
                         />
                         <HeroText
                              heading="CHH University Fellowships"
                              subtitle="A place where students grow in faith, build lasting friendships, and live boldly for Christ"
                              primaryButton={{
                                   text: "Join Our Ministry",
                                   href: "/connect"
                              }}
                         />
                    </section>

                    {/* 2. A Home on Campus Section */}
                    <ImageTextSection
                         heading="A Home on Campus"
                         description={`Christ Healing Home's University Fellowships are campus-based communities across the UK and Europe. Here, students come together to grow in faith and learning.

Every fellowship hosts weekly bible studies, social events, outreach, and worship evenings. These fellowships offer a safe space for both believers and those who desire to explore more Christian teachings and grow spiritually.`}
                         image={universityActivities[0] || ""}
                         imagePosition="left"
                         backgroundColor="#EAE4DB1A"
                    />

                    {/* 3. Our Campuses Section */}
                    <section className="py-24 bg-white">
                         <div className="container w-11/12 mx-auto px-4">
                              <SectionContent
                                   heading="Our Campuses"
                                   description="CHH University Fellowships meet weekly across various universities."
                                   secondaryButton={{
                                        text: "View all campuses",
                                        href: "/branches",
                                        icon: true,
                                        isOutline: true
                                   }}
                                   alignment="left"
                                   headingSize="medium"
                                   className="mb-12"
                              />

                              {/* Campus Cards Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                   {campuses.map((campus) => (
                                        <div
                                             key={campus.slug}
                                             style={{ backgroundColor: "#F7E7D880" }}
                                             className="rounded-lg overflow-hidden"
                                        >
                                             <ServiceLocationCard
                                                  slug={campus.slug}
                                                  image={campus.image}
                                                  title={campus.title}
                                                  services={campus.services}
                                                  address={campus.address}
                                                  mapLink={campus.mapLink}
                                             />
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </section>

                    {/* 4. Final CTA Section */}
                    <FinalCTA
                         heading="Join the movement"
                         subtitle="Whether you're starting university or preparing to graduate, CHH University Fellowships give you a place to grow, serve, and shine for Jesus."
                         primaryButtonText="Join Our Ministry"
                         primaryButtonHref="/connect"
                         backgroundColor="#FFFFFF"
                         backgroundImage={universityCTA}
                    />
               </main>
          </div>
     );
}


