import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionContent } from "@/components/common/SectionContent";
import { ImageCarousel } from "@/components/common/ImageCarousel";
import { ChhButton } from "@/components/common/ChhButton";
import { HeroText } from "@/components/common/HeroText";

// This would come from your API
interface LocationDetail {
   slug: string;
   title: string;
   category: string;
   description: string;
   quote: string;
   images: string[];
   mainImage: string;
   address: {
      label: string;
      detail: string;
   };
   serviceTimes: string[];
   contactInfo: string[];
   isCampus: boolean;
   campusInfo?: {
      howToFind: string;
      whatsappLink: string;
   };
}

// Simulated API call
async function getLocationDetail(slug: string): Promise<LocationDetail> {
   // In a real app, this would be an API call
   // For now, return mock data based on slug
   const isCampus = slug.includes("campus");

   return {
      slug,
      title: slug.includes("uk") ? "CHH London 1" :
         slug.includes("europe") ? "CHH Paris 1" :
            slug.includes("africa") ? "CHH Lagos 1" :
               "CHH University 1",
      category: slug.includes("uk") ? "CHH UK" :
         slug.includes("europe") ? "CHH Europe" :
            slug.includes("africa") ? "CHH Africa" :
               "CHH Campus",
      description: "We warmly invite you to join us for our Sunday and midweek gatherings, where you'll experience heartfelt worship, practical biblical teaching, and a strong sense of community. Our fellowships are built on love, support, and genuine connection.",
      quote: "Whether you are new to faith, returning after time away, or seeking a spiritual home, there is a place for you here at CHH.",
      images: [
         "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&h=800&fit=crop",
         "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop",
         "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&h=800&fit=crop",
         "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&h=800&fit=crop",
         "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&h=800&fit=crop",
         "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&h=800&fit=crop",
      ],
      mainImage: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1000&h=1200&fit=crop",
      address: {
         label: "Address",
         detail: isCampus ? "Student Union Building, Room 204" : "123 Church Street, London, UK SW1A 1AA"
      },
      serviceTimes: isCampus
         ? ["Friday Fellowship: 6:00 PM - 8:00 PM", "Tuesday Bible Study: 7:00 PM - 8:30 PM"]
         : ["Sunday Service: 10:00 AM - 12:30 PM", "Wednesday Bible Study: 7:00 PM - 9:00 PM", "Friday Night Prayer: 8:00 PM - 10:00 PM"],
      contactInfo: isCampus ? [] : ["+44 20 1234 5678", "info@chhlondon.org"],
      isCampus,
      campusInfo: isCampus ? {
         howToFind: "Forum seminar room 9",
         whatsappLink: "https://wa.me/1234567890"
      } : undefined
   };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
   const { slug } = await params;
   const location = await getLocationDetail(slug);
   return {
      title: `${location.title} | CHH Europe`,
      description: location.description,
   };
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params;
   const location = await getLocationDetail(slug);

   return (
      <div className="flex min-h-screen flex-col">
         <main className="flex-1">
            {/* Back Button and Hero */}
            <section className="container w-11/12 mx-auto px-4 pt-8">
               <Link
                  href="/join-service"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
               >
                  <ArrowLeft className="size-5" />
                  <span className="font-medium">Back to Locations</span>
               </Link>
            </section>

            <section
               className="container mx-auto px-4 relative h-[650px] w-11/12 flex items-end overflow-hidden"
            >
               {/* Background with overlay */}
               <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                     backgroundColor: "#382a4dff",
                     backgroundImage: "linear-gradient(rgba(89, 66, 123, 0.6), rgba(89, 66, 123, 0.6)), url('https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&h=1080&fit=crop')"
                  }}
               />
               <HeroText
                  heading={location?.category}
               />
            </section>

            {/* Welcome Section */}
            <section className="pt-16 pb-24 bg-white">
               <div className="container w-11/12 px-4 mx-auto">
                  <SectionContent
                     heading="We Look Forward to Welcoming You"
                     description={location.description}
                     quote={location.quote}
                     alignment="left"
                     headingSize="small"
                  />
               </div>
            </section>

            {/* Image Carousel */}
            <section className="py-24 bg-gray-50">
               <div className="container mx-auto">
                  <ImageCarousel
                     images={location.images}
                     height={360}
                     layout="multi"
                     showIndicators={false}
                  />
               </div>
            </section>

            {/* Location Info Section */}
            <section className="py-24">
               <div className="container w-11/12 px-4 mx-auto">
                  <div className="flex flex-col lg:flex-row items-center gap-[72px]">
                     {/* Image */}
                     <div className="w-full lg:w-1/2">
                        <img
                           src={location.mainImage}
                           alt={location.title}
                           className="w-full h-[542px] object-cover rounded-lg"
                        />
                     </div>

                     {/* Info Box */}
                     <div className="w-full lg:w-1/2 bg-[#6F5299] rounded-[12px] p-[32px_32px_64px_32px] text-white">
                        {/* Address */}
                        <div className="mb-8">
                           <h3 className="text-[24px] font-semibold mb-2">{location.address.label}</h3>
                           <p className="text-[16px] font-normal">{location.address.detail}</p>
                        </div>

                        {/* Service Times */}
                        <div className="mb-8">
                           <h3 className="text-[24px] font-semibold mb-2">Service Times</h3>
                           {location.serviceTimes.map((time, index) => (
                              <p key={index} className="text-[16px] font-normal mb-1">{time}</p>
                           ))}
                        </div>

                        {/* Contact Info or Campus Info */}
                        {location.isCampus && location.campusInfo ? (
                           <div>
                              <h3 className="text-[24px] font-semibold mb-2">How to Find Us</h3>
                              <p className="text-[16px] font-normal mb-4">{location.campusInfo.howToFind}</p>
                              <a href={location.campusInfo.whatsappLink} target="_blank" rel="noopener noreferrer">
                                 <ChhButton className="bg-white text-[#6F5299] hover:bg-gray-100">
                                    <span>Join our WhatsApp Group</span>
                                    <ArrowRight className="size-5" />
                                 </ChhButton>
                              </a>
                           </div>
                        ) : (
                           <div>
                              <h3 className="text-[24px] font-semibold mb-2">Contact Information</h3>
                              {location.contactInfo.map((contact, index) => (
                                 <p key={index} className="text-[16px] font-normal mb-1">{contact}</p>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
}
