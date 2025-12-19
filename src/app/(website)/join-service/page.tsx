import { Metadata } from "next";
import { HeroText } from "@/components/common/HeroText";
import { SectionContent } from "@/components/common/SectionContent";
import { LocationTabs } from "@/components/common/LocationTabs";
import { FinalCTA } from "@/components/common/FinalCTA";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
       title: "Join a Service | CHH Europe",
       description: "Find a Christ Healing Home location near you and join us for worship.",
};

// Helper function to create slug from name
function createSlug(name: string): string {
       return name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
}

// Helper function to parse services string into array
function parseServices(servicesStr: string | null): string[] {
       if (!servicesStr) return [];
       return servicesStr
              .split('|')
              .map(s => s.trim())
              .filter(s => s.length > 0);
}

// Fetch locations from database
async function getLocations() {
       try {
              const { data, error } = await supabaseAdmin
                     .from('locations')
                     .select('*')
                     .order('tag', { ascending: true })
                     .order('name', { ascending: true });

              if (error) {
                     console.error('Error fetching locations:', error);
                     return [];
              }

              return data || [];
       } catch (error) {
              console.error('Error fetching locations:', error);
              return [];
       }
}

// Transform database locations into the format expected by LocationTabs
function transformLocationsToTabs(locations: any[]) {
       const tagMap: Record<string, string> = {
              'CHH UK': 'chh-uk',
              'CHH Europe': 'chh-europe',
              'CHH Africa': 'chh-africa',
              'CHH on Campus': 'chh-campus',
       };

       // Group locations by tag
       const groupedByTag: Record<string, any[]> = {};

       locations.forEach((loc) => {
              const tag = loc.tag || 'CHH UK';  // Default to CHH UK if no tag
              if (!groupedByTag[tag]) {
                     groupedByTag[tag] = [];
              }

              const services = parseServices(loc.services);

              groupedByTag[tag].push({
                     slug: createSlug(loc.name),
                     title: loc.name,
                     services: services,  // Array of services
                     address: loc.address || '',
                     image: loc.image_url || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop',
                     mapLink: loc.map_link || `https://maps.google.com/?q=${encodeURIComponent(loc.address || loc.name)}`
              });
       });

       // Transform into the tab structure
       const tabs = Object.entries(groupedByTag).map(([tag, locations]) => ({
              id: tagMap[tag] || createSlug(tag),
              name: tag,
              locations: locations
       }));

       return tabs;
}

export default async function JoinServicePage() {
       const locations = await getLocations();
       const locationTabs = transformLocationsToTabs(locations);

       return (
              <div className="flex min-h-screen flex-col">
                     <main className="flex-1">
                            {/* Hero Section */}
                            <section
                                   className="relative h-[650px] w-full flex items-end overflow-hidden"
                            >
                                   {/* Background with overlay */}
                                   <div
                                          className="absolute inset-0 bg-cover bg-center"
                                          style={{
                                                 backgroundColor: "#382a4dff",
                                                 backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&h=1080&fit=crop')"
                                          }}
                                   />
                                   <HeroText
                                          heading="Join Us for Worship"
                                          subtitle="Find a Christ Healing Home location near you and experience the power of God's presence."
                                   />
                            </section>

                            {/* Who We Are Section */}
                            <section className="py-24 bg-white">
                                   <div className="container w-11/12 px-4 mx-auto">
                                          <SectionContent
                                                 heading="We Look Forward to Welcoming You"
                                                 description="We warmly invite you to join us for our Sunday and midweek gatherings, where you'll experience
heartfelt worship, practical biblical teaching, and a strong sense of community. Our fellowships
are built on love, support, and genuine connection.
"
                                                 quote='Whether you are new to faith, returning after time away, or seeking a spiritual home, there is a
place for you here at CHH.'
                                                 alignment="left"
                                                 headingSize="small"
                                          />
                                   </div>
                            </section>

                            {/* Locations Section */}
                            <section id="locations" className="py-24 bg-gray-50">
                                   <div className="container w-11/12 px-4 mx-auto">
                                          {locationTabs.length > 0 ? (
                                                 <LocationTabs tabs={locationTabs} />
                                          ) : (
                                                 <div className="text-center py-12">
                                                        <p className="text-gray-600 text-lg">No locations available at the moment. Please check back later.</p>
                                                 </div>
                                          )}
                                   </div>
                            </section>

                            {/* Final CTA */}
                            <FinalCTA
                                   heading="Can't Find a Location Near You?"
                                   subtitle="We're always expanding and would love to help you connect with our community online or find the nearest branch to you."
                                   primaryButtonText="Contact Us"
                                   primaryButtonHref="/connect"
                            />
                     </main>
              </div>
       );
}
