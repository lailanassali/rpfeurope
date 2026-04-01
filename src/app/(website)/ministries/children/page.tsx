import { Metadata } from "next";
import { ImageTextSection } from "@/components/common/ImageTextSection";
import { FinalCTA } from "@/components/common/FinalCTA";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getHeroImage, getCarouselImages } from "@/lib/image-utils";
import { HeroText } from "@/components/common/HeroText";

export const metadata: Metadata = {
     title: "Children's Department | Redeemed Pillar of Fire",
     description: "Every child is loved, welcomed, and encouraged to grow in faith and character.",
};

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

export default async function ChildrenPage() {
     // Fetch images from database
     const childrenHero = await getHeroImage('children_hero');
     const childrenActivities = await getCarouselImages('children_activities');
     const childrenCTA = await getHeroImage('children_cta');
     const childrenFaith = await getHeroImage('children_faith');
     const childrenFamily = await getHeroImage('children_family');
     const childrenPlace = await getHeroImage('children_place');

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
                                   backgroundImage: childrenHero ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${childrenHero}')` : "#382a4dff"
                              }}
                         />

                         <HeroText
                              heading="RPF Children's Church"
                              subtitle="Every child is loved, welcomed, and encouraged to grow in faith and character."
                              primaryButton={{
                                   text: "Join Our Children's Service",
                                   href: "/join-service",
                              }}
                         />
                    </section>

                    {/* 2. Quote and Description Section */}
                    <section className="bg-white py-16 md:py-[106px]">
                         <div className="container w-11/12 mx-auto px-4 text-center">
                              <p className="text-2xl md:text-[36px] mb-8" style={{ color: "#463460" }}>
                                   "At Redeemed Pillar of Fire (RPF), every child is loved, welcomed, and encouraged to grow in faith and character."
                              </p>
                              <p className="text-lg md:text-[20px]" style={{ color: "#373737" }}>
                                   Each moment shared is built on the word of God, providing a strong foundation, preparing young hearts to know the deep love of Christ. Here, parents can be confident that their children are safe, valued and surrounded by dedicated leaders.
                              </p>
                         </div>
                    </section>

                    {/* 3. Image Grid Section */}
                    <section className="bg-white pb-16 md:pb-[120px]">
                         <div className="mx-auto container w-11/12 px-4">
                              <div className="grid grid-cols-2 md:flex gap-4 md:gap-2 items-center">
                                   {/* Image 1 - 400px height */}
                                   <div className="flex-[0.9] w-full">
                                        <div
                                             className="relative w-full overflow-hidden rounded-[4px] h-[200px] md:h-[400px]"
                                             style={{
                                                  backgroundImage: childrenActivities[0] ? `url('${childrenActivities[0]}')` : "none",
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center"
                                             }}
                                        />
                                   </div>

                                   {/* Image 2 - 360px height */}
                                   <div className="flex-1 w-full">
                                        <div
                                             className="relative w-full overflow-hidden rounded-[4px] h-[200px] md:h-[360px]"
                                             style={{
                                                  backgroundImage: childrenActivities[1] ? `url('${childrenActivities[1]}')` : "none",
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center"
                                             }}
                                        />
                                   </div>

                                   {/* Image 3 - 400px height */}
                                   <div className="flex-[0.9] w-full mt-4 md:mt-0">
                                        <div
                                             className="relative w-full overflow-hidden rounded-[4px] h-[200px] md:h-[400px]"
                                             style={{
                                                  backgroundImage: childrenActivities[2] ? `url('${childrenActivities[2]}')` : "none",
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center"
                                             }}
                                        />
                                   </div>

                                   {/* Image 4 - 360px height */}
                                   <div className="flex-1 w-full mt-4 md:mt-0">
                                        <div
                                             className="relative w-full overflow-hidden rounded-[4px] h-[200px] md:h-[360px]"
                                             style={{
                                                  backgroundImage: childrenActivities[3] ? `url('${childrenActivities[3]}')` : "none",
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center"
                                             }}
                                        />
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* 4. Building Faith from the Start Section */}
                    <ImageTextSection
                         heading="Building Faith from the Start"
                         description={`Sundays and midweek gatherings are filled with worship, laughter, learning and age appropriate activities.

Each moment shared is built on the word of God, providing a strong foundation, preparing young hearts to know the deep love of Christ.`}
                         image={childrenFaith || ""}
                         imagePosition="right"
                         backgroundColor="#CEC3DF40"
                    />

                    {/* 5. Be Part of the Family Section */}
                    <section className="bg-white py-16 md:py-[104px]">
                         <div className="container w-11/12 mx-auto px-4">
                              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[72px]">
                                   {/* Image - left */}
                                   <div className="flex-1 w-full flex items-center justify-center">
                                        <div className="relative w-full overflow-hidden rounded-lg h-[350px] md:h-[500px]">
                                             <Image
                                                  src={childrenFamily || ""}
                                                  alt="Be Part of the Family"
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                   </div>

                                   {/* Text - right */}
                                   <div className="flex-1 w-full text-left">
                                        <h2 className="text-2xl md:text-[48px] font-bold mb-6" style={{ color: "#111111" }}>
                                             Be Part of the Family
                                        </h2>
                                        <div className="md:text-[20px] whitespace-pre-line mb-8" style={{ color: "#373737" }}>
                                             {`Here, parents can be confident that their children are safe, valued and surrounded by dedicated leaders.

Whether your child is taking their first steps of faith, there is a place for them here in the RPF Children's family.`}
                                        </div>

                                        {/* Outline Button */}
                                        <Link href="/ministries/children/register" className="block w-full sm:w-auto">
                                             <button className="inline-flex items-center w-full sm:w-auto justify-center gap-2 font-semibold text-base md:text-xl px-4 md:px-8 h-12 md:h-14 rounded-[4px] transition-colors text-[#59427B] border-[#59427B] border-[0.5px] hover:bg-[#59427B] hover:text-white">
                                                  Pre-register your child
                                                  <ArrowRight className="size-5" />
                                             </button>
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* 6. A Place for Every Child Section */}
                    <section className="py-16 md:py-[96px]" style={{ backgroundColor: "#EAE4DB1A" }}>
                         <div className="container w-11/12 mx-auto px-4 lg:px-0">
                              <h2 className="text-2xl md:text-[40px] font-bold" style={{ color: "#111111" }}>
                                   A place for every child
                              </h2>
                              <p className="md:text-[20px] mt-4 md:mt-5 mb-10 md:mb-[72px]">
                                   Join us, and let your child be part of what God is building in this generation.
                              </p>

                              {/* Image with Glass Overlay */}
                              <div
                                   className="relative w-full overflow-hidden rounded-2xl h-[500px] md:h-[600px]"
                                   style={{
                                        backgroundImage: childrenPlace ? `url('${childrenPlace}')` : "none",
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
                                                  Children's Service
                                             </h3>

                                             {/* Time */}
                                             <div className="flex items-center gap-3 mb-4">
                                                  <Clock className="size-5 text-white" />
                                                  <span className="text-white text-base md:text-lg">Sunday, 12:00 AM</span>
                                             </div>

                                             {/* Location */}
                                             <div className="flex items-start gap-3 mb-8 md:mb-10">
                                                  <MapPin className="size-5 text-white mt-1 shrink-0" />
                                                  <span className="text-white text-base md:text-lg">
                                                       Redeemed Pillar of Fire (RPF), Children's Hall
                                                  </span>
                                             </div>

                                             {/* Button */}
                                             <Link
                                                  href="/ministries/children/register"
                                                  target="_blank"
                                                  className="w-full"
                                             >
                                                  <button
                                                       className="flex items-center justify-center gap-2 text-white font-semibold transition-all hover:opacity-90 px-6 w-full h-12 md:h-[54px] rounded-[4px]"
                                                       style={{ backgroundColor: "#59427B" }}
                                                  >
                                                       <span>Pre-register Now</span>
                                                       <ArrowRight className="size-5" />
                                                  </button>
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* 7. Final CTA Section */}
                    <FinalCTA
                         heading="There's a place for every child at RPF."
                         subtitle="Join us this Sunday and let your child be part of what God is building in this generation."
                         primaryButtonText="Upcoming event at RPF Children"
                         primaryButtonHref="/events?tab=children"
                         backgroundColor="#CEC3DF"
                         backgroundImage={childrenCTA}
                    />
               </main>
          </div>
     );
}
