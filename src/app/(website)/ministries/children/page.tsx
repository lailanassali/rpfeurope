import { Metadata } from "next";
import { ImageTextSection } from "@/components/common/ImageTextSection";
import { FinalCTA } from "@/components/common/FinalCTA";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getHeroImage, getCarouselImages } from "@/lib/image-utils";

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
                    <section className="relative h-[700px] w-full flex items-end overflow-hidden">
                         {/* Background with overlay */}
                         <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                   backgroundColor: "#382a4dff",
                                   backgroundImage: childrenHero ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${childrenHero}')` : "#382a4dff"
                              }}
                         />
                         <div className="py-[43px] px-[80px] relative">
                              <div>
                                   <h2
                                        className="text-white mb-[12px]"
                                        style={{ fontSize: "36px", fontWeight: 700 }}
                                   >
                                        RPF Children's Department
                                   </h2>
                                   <p
                                        className="text-white/90"
                                        style={{ fontSize: "20px", fontWeight: 500 }}
                                   >
                                        Every child is loved, welcomed, and encouraged to grow in faith and character.
                                   </p>
                              </div>
                              <div className="flex gap-[24px] mt-[32px]">
                                   <Link href="/ministries/children/register">
                                        <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-[54px] px-[24px] py-[12px] text-[20px] min-w-[240px] rounded-[4px] flex items-center justify-center gap-2">
                                             <span>Join Our Children's Service</span>
                                             <ArrowRight className="size-5" />
                                        </button>
                                   </Link>
                              </div>
                         </div>
                    </section>

                    {/* 2. Quote and Description Section */}
                    <section style={{ paddingTop: "106px", paddingBottom: "106px" }} className="bg-white">
                         <div className="container w-11/12 mx-auto px-4 text-center">
                              <p className="text-[36px] mb-8" style={{ color: "#463460" }}>
                                   "At Redeemed Pillar of Fire (RPF), every child is loved, welcomed, and encouraged to grow in faith and character."
                              </p>
                              <p className="text-[20px]" style={{ color: "#373737" }}>
                                   Each moment shared is built on the word of God, providing a strong foundation, preparing young hearts to know the deep love of Christ. Here, parents can be confident that their children are safe, valued and surrounded by dedicated leaders.
                              </p>
                         </div>
                    </section>

                    {/* 3. Image Grid Section */}
                    <section className="bg-white pb-[120px]">
                         <div className=" mx-auto">
                              <div className="flex gap-2 items-center">
                                   {/* Image 1 - 400px height */}
                                   <div className="flex-[0.9]">
                                        <div
                                             className="relative w-full overflow-hidden rounded-[4px]"
                                             style={{
                                                  height: "400px",
                                                  backgroundImage: childrenActivities[0] ? `url('${childrenActivities[0]}')` : "none",
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center"
                                             }}
                                        />
                                   </div>

                                   {/* Image 2 - 360px height */}
                                   <div className="flex-1">
                                        <div
                                             className="relative w-full overflow-hidden rounded-[4px]"
                                             style={{
                                                  height: "360px",
                                                  backgroundImage: childrenActivities[1] ? `url('${childrenActivities[1]}')` : "none",
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center"
                                             }}
                                        />
                                   </div>

                                   {/* Image 3 - 400px height */}
                                   <div className="flex-[0.9]">
                                        <div
                                             className="relative w-full overflow-hidden rounded-[4px]"
                                             style={{
                                                  height: "400px",
                                                  backgroundImage: childrenActivities[2] ? `url('${childrenActivities[2]}')` : "none",
                                                  backgroundSize: "cover",
                                                  backgroundPosition: "center"
                                             }}
                                        />
                                   </div>

                                   {/* Image 4 - 360px height */}
                                   <div className="flex-1">
                                        <div
                                             className="relative w-full overflow-hidden rounded-[4px]"
                                             style={{
                                                  height: "360px",
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
                    <section style={{ backgroundColor: "#FFFFFF", paddingTop: "104px", paddingBottom: "104px" }}>
                         <div className="container w-11/12 mx-auto px-4">
                              <div className="flex items-center" style={{ gap: "72px" }}>
                                   {/* Image - left */}
                                   <div className="flex-2 flex items-center justify-center">
                                        <div className="relative w-full overflow-hidden rounded-lg" style={{ height: "500px" }}>
                                             <Image
                                                  src={childrenFamily || ""}
                                                  alt="Be Part of the Family"
                                                  fill
                                                  className="object-cover"
                                             />
                                        </div>
                                   </div>

                                   {/* Text - right */}
                                   <div className="flex-3 text-left">
                                        <h2 className="text-[48px] font-bold mb-6" style={{ color: "#111111" }}>
                                             Be Part of the Family
                                        </h2>
                                        <div className="text-[20px] whitespace-pre-line mb-8" style={{ color: "#373737" }}>
                                             {`Here, parents can be confident that their children are safe, valued and surrounded by dedicated leaders.

Whether your child is taking their first steps of faith, there is a place for them here in the RPF Children's family.`}
                                        </div>

                                        {/* Outline Button */}
                                        <Link href="/ministries/children/register">
                                             <button className="inline-flex items-center justify-center gap-2 font-semibold text-xl px-8 h-14 rounded-[4px] transition-colors text-[#59427B] border-[#59427B] border-[0.5px] hover:bg-[#59427B] hover:text-white">
                                                  Pre-register your child
                                                  <ArrowRight className="size-5" />
                                             </button>
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* 6. A Place for Every Child Section */}
                    <section style={{ backgroundColor: "#EAE4DB1A", paddingTop: "96px", paddingBottom: "96px" }}>
                         <div className="container w-11/12 mx-auto px-4">
                              <h2 className="text-[40px] font-bold" style={{ color: "#111111" }}>
                                   A place for every child
                              </h2>
                              <p className="text-[20px] mt-5 mb-[72px]">
                                   Join us, and let your child be part of what God is building in this generation.
                              </p>

                              {/* Image with Glass Overlay */}
                              <div
                                   className="relative w-full overflow-hidden"
                                   style={{
                                        height: "600px",
                                        borderRadius: "24px",
                                        backgroundImage: childrenPlace ? `url('${childrenPlace}')` : "none",
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
                                                  Children's Service
                                             </h3>

                                             {/* Time */}
                                             <div className="flex items-center gap-3 mb-4">
                                                  <Clock className="size-5 text-white" />
                                                  <span className="text-white text-lg">Sunday, 10:00 AM</span>
                                             </div>

                                             {/* Location */}
                                             <div className="flex items-start gap-3 mb-10">
                                                  <MapPin className="size-5 text-white mt-1 shrink-0" />
                                                  <span className="text-white text-lg">
                                                       Redeemed Pillar of Fire (RPF), Children's Hall
                                                  </span>
                                             </div>

                                             {/* Button */}
                                             <Link
                                                  href="/ministries/children/register"
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
                         primaryButtonText="Pre-register your child"
                         primaryButtonHref="/ministries/children/register"
                         backgroundColor="#CEC3DF"
                         backgroundImage={childrenCTA}
                    />
               </main>
          </div>
     );
}
