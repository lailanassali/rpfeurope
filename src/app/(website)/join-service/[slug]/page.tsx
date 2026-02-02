import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionContent } from "@/components/common/SectionContent";
import { ImageCarousel } from "@/components/common/ImageCarousel";
import { HeroText } from "@/components/common/HeroText";
import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { RPFButton } from "@/components/common/RPFButton";

// Helper function to parse services
function parseServices(servicesStr: string | null): string[] {
   if (!servicesStr) return [];
   return servicesStr
      .split('|')
      .map(s => s.trim())
      .filter(s => s.length > 0);
}

// Fetch location from database
async function getLocationDetail(slug: string) {
   try {
      const { data, error } = await supabaseAdmin
         .from('locations')
         .select('*')
         .ilike('name', `%${slug.replace(/-/g, ' ')}%`)
         .single();

      if (error || !data) return null;
      return data;
   } catch (error) {
      return null;
   }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
   const { slug } = await params;
   const location = await getLocationDetail(slug);

   if (!location) {
      return {
         title: 'Location Not Found | CHH Europe',
      };
   }

   return {
      title: `${location.name} | CHH Europe`,
      description: `Join us for service at ${location.name}. ${location.address}`,
   };
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params;
   const location = await getLocationDetail(slug);

   if (!location) {
      notFound();
   }

   const services = parseServices(location.services);
   const contacts = parseServices(location.contact);
   const isCampus = location.tag === 'CHH on Campus';

   // Parse how_to_find_us to extract content after colon if present
   const parseHowToFindUs = (text: string | null) => {
      if (!text) return 'Check with the campus fellowship for specific meeting locations.';
      if (text.includes(':')) {
         return text.split(':')[1].trim();
      }
      return text;
   };

   // Use dynamic carousel images if available, otherwise fallback
   const carouselImages = (location.carousel_images && location.carousel_images.length > 0)
      ? location.carousel_images
      : [
         "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&h=800&fit=crop",
         "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop",
         "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&h=800&fit=crop",
      ];

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
               className="container mx-auto px-4 relative md:h-[650px] h-[450px] w-11/12 flex items-end overflow-hidden"
            >
               {/* Background with overlay */}
               <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                     backgroundColor: "#382a4dff",
                     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${location.image_url || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&h=1080&fit=crop'}')`
                  }}
               />
               <HeroText
                  heading={location.tag || location.name}
               />
            </section>

            {/* Welcome Section */}
            <section className="md:pt-16 pt-12 md:pb-24 pb-12 bg-white">
               <div className="container w-11/12 px-4 mx-auto">
                  <SectionContent
                     heading={location.welcome_heading || "We Look Forward to Welcoming You"}
                     description={location.welcome_description || "We warmly invite you to join us for our Sunday and midweek gatherings, where you'll experience heartfelt worship, practical biblical teaching, and a strong sense of community."}
                     quote={location.welcome_quote || "Whether you are new to faith, returning after time away, or seeking a spiritual home, there is a place for you here at CHH."}
                     alignment="left"
                     headingSize="small"
                  />
               </div>
            </section>

            {/* Image Carousel */}
            <section className="md:py-24 py-12 bg-gray-50">
               <div className="container mx-auto">
                  <ImageCarousel
                     images={carouselImages}
                     height={360}
                     layout="multi"
                     showIndicators={false}
                  />
               </div>
            </section>

            {/* Location Info Section */}
            <section className="md:py-24 py-12">
               <div className="container w-11/12 px-4 mx-auto">
                  <div className="flex flex-col lg:flex-row items-center gap-[72px]">
                     {/* Image */}
                     <div className="w-full lg:w-1/2">
                        <img
                           src={location.address_image_url || location.image_url || 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1000&h=1200&fit=crop'}
                           alt={location.name}
                           className="w-full md:h-[542px] h-[362px] object-cover rounded-lg"
                        />
                     </div>

                     {/* Info Box */}
                     <div className="w-full lg:w-1/2 bg-[#6F5299] rounded-[12px] p-[32px_32px_64px_32px] text-white">
                        {/* Address */}
                        <div className="mb-8">
                           <h3 className="md:text-[24px] text-[18px] font-semibold mb-2">Address</h3>
                           <p className="md:text-[16px] text-[14px] font-normal">{location.address || 'Address not available'}</p>
                        </div>

                        {/* Service Times */}
                        {services.length > 0 && (
                           <div className="mb-8">
                              <h3 className="md:text-[24px] text-[18px] font-semibold mb-2">Service Times</h3>
                              {services.map((service, index) => (
                                 <p key={index} className="md:text-[16px] text-[14px] font-normal mb-1">{service}</p>
                              ))}
                           </div>
                        )}

                        {/* Campus Info or Map Link */}
                        {isCampus ? (
                           <div>
                              <h3 className="md:text-[24px] text-[18px] font-semibold mb-2">How to Find Us</h3>
                              <p className="md:text-[16px] text-[14px] font-normal mb-4">
                                 {parseHowToFindUs(location.how_to_find_us)}
                              </p>
                              {location.whatsapp_link && (
                                 <a href={location.whatsapp_link} target="_blank" rel="noopener noreferrer">
                                    <RPFButton className="bg-white text-[#6F5299] hover:bg-gray-100 rounded-lg h-12">
                                       <span>Join Our WhatsApp Group</span>
                                       <ArrowRight className="size-5" />
                                    </RPFButton>
                                 </a>
                              )}
                           </div>
                        ) : (
                           <div>
                              {contacts.length > 0 && (
                                 <div className="mb-8">
                                    <h3 className="md:text-[24px] text-[18px] font-semibold mb-2">Contact Us</h3>
                                    {contacts.map((contact, index) => (
                                       <p key={index} className="md:text-[16px] text-[14px] font-normal mb-1">{contact}</p>
                                    ))}
                                 </div>
                              )}

                              {location.map_link && (
                                 <a href={location.map_link} target="_blank" rel="noopener noreferrer">
                                    <RPFButton className="bg-white text-[#6F5299] hover:bg-gray-100 rounded-lg h-12">
                                       <span>Get Directions</span>
                                       <ArrowRight className="size-5" />
                                    </RPFButton>
                                 </a>
                              )}
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
