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
     title: "CHH Youth | Christ Healing Home",
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
                    <section className="relative h-[700px] w-full flex items-end overflow-hidden">
                         {/* Background with overlay */}
                         <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                   backgroundColor: "#382a4dff",
                                   backgroundImage: youthHero ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${youthHero}')` : "#382a4dff"
                              }}
                         />
                         <HeroText
                              heading="CHH Youth"
                              subtitle="A Generation Rising in Christ. A space where young people encounter God, build real friendships, and discover who they are in Him."
                              primaryButton={{
                                   text: "Join Our Ministry",
                                   href: "/connect"
                              }}
                         />
                    </section>

                    {/* 2. A Place to Belong Section */}
                    <ImageTextSection
                         heading="A Place to Belong"
                         description="Welcome to CHH Youth led by Pastor Reece. In this house, no one is left behind. Every young person has a voice and a place to belong. Here, the youth are encouraged, equipped, and empowered to grow strong in God's word and in who He has called them to be."
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

Whether you're new to faith, returning after time away, or searching for a spiritual home to call your own, Christ Healing Home has a room for you.

Come and be part of what God is building in this generation, your story matters here.`}
                         image={youthRootedFaith || ""}
                         imagePosition="right"
                         backgroundColor="#FFFFFF"
                    />

                    {/* 4. Where We Meet and Grow Section */}
                    <section style={{ backgroundColor: "#CEC3DF40", paddingTop: "96px", paddingBottom: "96px" }}>
                         <div className="container w-11/12 mx-auto px-4">
                              <h2 className="text-[40px] font-bold" style={{ color: "#111111" }}>
                                   Where We Meet and Grow
                              </h2>
                              <p className="text-[20px] mt-5 mb-[72px]">
                                   Join us in a space where faith, friendship, and purpose come alive every week.
                              </p>

                              {/* Image with Glass Overlay */}
                              <div
                                   className="relative w-full overflow-hidden"
                                   style={{
                                        height: "600px",
                                        borderRadius: "24px",
                                        backgroundImage: youthMeetGrow ? `url('${youthMeetGrow}')` : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                   }}
                              >
                                   {/* Glass Effect Overlay Card */}
                                   <div
                                        className="absolute inset-0 flex items-end justify-end"
                                        style={{ padding: "38px" }}
                                   >
                                        <div
                                             style={{
                                                  backgroundColor: "#866AAF40",
                                                  backdropFilter: "blur(10px)",
                                                  WebkitBackdropFilter: "blur(10px)",
                                                  padding: "32px",
                                                  borderRadius: "16px",
                                                  maxWidth: "582px"
                                             }}
                                        >
                                             <h3 className="text-[40px] font-bold text-white mb-7">
                                                  Sunday Service
                                             </h3>

                                             {/* Time */}
                                             <div className="flex items-center gap-3 mb-4">
                                                  <Clock className="size-5 text-white" />
                                                  <span className="text-white text-lg">12:00 - 14:00</span>
                                             </div>

                                             {/* Location */}
                                             <div className="flex items-start gap-3 mb-10">
                                                  <MapPin className="size-5 text-white mt-1 shrink-0" />
                                                  <span className="text-white text-lg">
                                                       Christ Healing Home (CHH), 1st Floor, Youth Hall, 1A Elthorne Road, N19 4AL
                                                  </span>
                                             </div>

                                             {/* Button */}
                                             <Link
                                                  href="https://maps.google.com/?q=1A+Elthorne+Road+N19+4AL"
                                                  target="_blank"
                                             >
                                                  <button
                                                       className="flex items-center justify-center gap-2 text-white font-semibold transition-all hover:opacity-90 px-6"
                                                       style={{
                                                            backgroundColor: "#59427B",
                                                            height: "54px",
                                                            borderRadius: "4px"
                                                       }}
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

                    {/* 5. CHH Youth Branches Section */}
                    <section id="locations" className="py-24 bg-gray-50">
                         <div className="container w-11/12 px-4 mx-auto">
                              <LocationTabs tabs={locationTabs} />
                         </div>
                    </section>

                    {/* 6. Our Leadership Section */}
                    <section style={{ backgroundColor: "#FAEEE266", paddingTop: "96px", paddingBottom: "96px" }}>
                         <div className="container w-11/12 mx-auto px-4">
                              <h2 className="text-[40px] font-bold mb-12" style={{ color: "#111111" }}>
                                   Our Leadership
                              </h2>

                              <div className="flex items-center" style={{ gap: "88px" }}>
                                   {/* Image */}
                                   <div className="flex-1">
                                        <div className="relative w-full overflow-hidden rounded-lg" style={{ height: "520px" }}>
                                             <Image
                                                  src={youthLeadership || ""}
                                                  alt="Pastor Reece"
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                   </div>

                                   {/* Text */}
                                   <div className="flex-1">
                                        <h3 className="text-[32px] font-bold mb-6" style={{ color: "#111111" }}>
                                             Pastor Reece
                                        </h3>
                                        <div className="text-[20px] font-normal leading-relaxed whitespace-pre-line">
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
                         primaryButtonText="Volunteer with CHH Youth"
                         primaryButtonHref="/connect"
                         backgroundColor="#CEC3DF"
                         backgroundImage={youthCTA}
                    />
               </main>
          </div>
     );
}

