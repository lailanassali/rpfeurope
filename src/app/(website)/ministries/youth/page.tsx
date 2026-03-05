import { Metadata } from "next";
import { HeroText } from "@/components/common/HeroText";
import { ImageTextSection } from "@/components/common/ImageTextSection";
import { LocationTabs } from "@/components/common/LocationTabs";
import { FinalCTA } from "@/components/common/FinalCTA";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getHeroImage } from "@/lib/image-utils";
import { getAllLocations, transformLocationsToTabs } from "@/lib/location-utils";



export const metadata: Metadata = {
     title: "RPF Youth | Redeemed Pillar of Fire",
     description: "A Generation Rising in Christ. A space where young people encounter God, build real friendships, and discover who they are in Him.",
};

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export default async function YouthPage() {
     // Fetch images from database
     const youthHero = await getHeroImage('youth_hero');
     const youthPlaceBelong = await getHeroImage('youth_place_belong');
     const youthRootedFaith = await getHeroImage('youth_rooted_faith');
     const youthMeetGrow = await getHeroImage('youth_meet_grow');
     const youthLeadership = await getHeroImage('youth_leadership');
     const youthCTA = await getHeroImage('youth_cta');

     // Fetch all locations and transform to tabs logic as in join-service
     const locations = await getAllLocations();
     const locationTabs = transformLocationsToTabs(locations);

     return (
          <div className="w-full flex min-h-screen flex-col font-sans">
               <main className="flex-1">
                    {/* 1. Hero Section */}
                    <section className="relative h-[400px] md:h-[600px] lg:h-[700px] w-full flex items-end overflow-hidden mb-8">
                         {/* Background with overlay */}
                         <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                   backgroundColor: "#382a4dff",
                                   backgroundImage: youthHero ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${youthHero}')` : "#382a4dff"
                              }}
                         />
                         <HeroText
                              heading="RPF Youth"
                              subtitle="A Generation Rising in Christ. A space where young people encounter God, build real friendships, and discover who they are in Him."
                              primaryButton={{
                                   text: "Get Involved",
                                   href: "/connect"
                              }}
                         />
                    </section>

                    {/* 2. A Place to Belong Section */}
                    <ImageTextSection
                         heading="A Place to Belong"
                         description="Welcome to RPF Youth led by Pastor Reece. In this house, no one is left behind. Every young person has a voice and a place to belong. Here, the youth are encouraged, equipped, and empowered to grow strong in God's word and in who He has called them to be."
                         quote="Don't let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity. — 1 Timothy 4:12"
                         image={youthPlaceBelong || ""}
                         imagePosition="left"
                         backgroundColor="#EAE4DB1A"
                    />

                    {/* 3. Rooted in Faith Section */}
                    <ImageTextSection
                         heading="Rooted in Faith, Built on Friendship"
                         description={`Our Sunday and midweek gatherings are filled with worship, friendship, and are founded on God's truth.

Our youth community stands with you, reminding you that you are never too young to serve God and make a difference for Christ.

Whether you're new to faith, returning after time away, or searching for a spiritual home to call your own, Redeemed Pillar of Fire has a room for you.

Come and be part of what God is building in this generation, your story matters here.`}
                         image={youthRootedFaith || ""}
                         imagePosition="right"
                         backgroundColor="#FFFFFF"
                    />

                    {/* 4. Where We Meet and Grow Section */}
                    <section className="py-16 md:py-[96px]" style={{ backgroundColor: "#CEC3DF40" }}>
                         <div className="container w-11/12 mx-auto px-4 lg:px-0">
                              <h2 className="text-3xl md:text-[40px] font-bold" style={{ color: "#111111" }}>
                                   Where We Meet and Grow
                              </h2>
                              <p className="text-lg md:text-[20px] mt-4 md:mt-5 mb-10 md:mb-[72px]">
                                   Join us in a space where faith, friendship, and purpose come alive every week.
                              </p>

                              {/* Image with Glass Overlay */}
                              <div
                                   className="relative w-full overflow-hidden rounded-2xl h-[500px] md:h-[600px]"
                                   style={{
                                        backgroundImage: youthMeetGrow ? `url('${youthMeetGrow}')` : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                   }}
                              >
                                   {/* Glass Effect Overlay Card */}
                                   <div className="absolute inset-0 flex items-end justify-end p-4 md:p-[38px]">
                                        <div
                                             className="p-6 md:p-8 rounded-2xl w-full max-w-[582px]"
                                             style={{
                                                  backgroundColor: "#866AAF40",
                                                  backdropFilter: "blur(10px)",
                                                  WebkitBackdropFilter: "blur(10px)",
                                             }}
                                        >
                                             <h3 className="text-2xl md:text-[40px] font-bold text-white mb-6 md:mb-7">
                                                  Sunday Service
                                             </h3>

                                             {/* Time */}
                                             <div className="flex items-center gap-3 mb-4">
                                                  <Clock className="size-5 text-white" />
                                                  <span className="text-white text-base md:text-lg">12:00 - 14:00</span>
                                             </div>

                                             {/* Location */}
                                             <div className="flex items-start gap-3 mb-8 md:mb-10">
                                                  <MapPin className="size-5 text-white mt-1 shrink-0" />
                                                  <span className="text-white text-base md:text-lg">
                                                       Redeemed Pillar of Fire (RPF), 1st Floor, Youth Hall, 1A Elthorne Road, N19 4AL
                                                  </span>
                                             </div>

                                             {/* Button */}
                                             <Link
                                                  href="https://maps.google.com/?q=1A+Elthorne+Road+N19+4AL"
                                                  target="_blank"
                                                  className="w-full"
                                             >
                                                  <button
                                                       className="flex items-center justify-center gap-2 text-white font-semibold transition-all hover:opacity-90 px-6 w-full h-12 md:h-[54px] rounded-[4px]"
                                                       style={{ backgroundColor: "#59427B" }}
                                                  >
                                                       <span>Get Directions</span>
                                                       <ArrowRight className="size-5" />
                                                  </button>
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* 5. RPF Youth Branches Section */}
                    <section id="locations" className="py-24 bg-gray-50">
                         <div className="container w-11/12 px-4 mx-auto">
                              <LocationTabs tabs={locationTabs} />
                         </div>
                    </section>

                    {/* 6. Our Leadership Section */}
                    <section className="py-16 md:py-[96px]" style={{ backgroundColor: "#FAEEE266" }}>
                         <div className="container w-11/12 mx-auto px-4">
                              <h2 className="text-3xl md:text-[40px] font-bold mb-8 md:mb-12" style={{ color: "#111111" }}>
                                   Our Leadership
                              </h2>

                              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[88px]">
                                   {/* Image */}
                                   <div className="flex-1 w-full">
                                        <div className="relative w-full overflow-hidden rounded-lg h-[350px] md:h-[520px]">
                                             <Image
                                                  src={youthLeadership || ""}
                                                  alt="Pastor Reece"
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                   </div>

                                   {/* Text */}
                                   <div className="flex-1 w-full text-left">
                                        <h3 className="text-2xl md:text-[32px] font-bold mb-4 md:mb-6" style={{ color: "#111111" }}>
                                             Pastor Reece
                                        </h3>
                                        <div className="text-lg md:text-[20px] font-normal leading-relaxed whitespace-pre-line text-[#373737]">
                                             {`Pastor Reece leads RPF Youth with heart, faith, and vision for this generation. He's passionate about seeing young people discover who they are in God and step boldly into the lives they were created for.

More than a pastor, he's a mentor and a friend, someone who listens, challenges, and walks with the youth as they grow in both faith and purpose. His desire is simple: to build a space where every young person feels seen, valued, and equipped to live out their calling.`}
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* 7. Final CTA Section */}
                    <FinalCTA
                         heading="Be a Part of the Story"
                         subtitle="Step in, bring your story, and be part of what God is building in our generation. You don't have to wait to belong here. There's space for you to grow, serve, and make a difference with others who are doing the same."
                         primaryButtonText="Upcoming at RPF Youth"
                         primaryButtonHref="/events?tab=youth"
                         backgroundColor="#CEC3DF"
                         backgroundImage={youthCTA}
                    />
               </main>
          </div>
     );
}

