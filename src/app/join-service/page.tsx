import { Metadata } from "next";
import { HeroText } from "@/components/common/HeroText";
import { SectionContent } from "@/components/common/SectionContent";
import { LocationTabs } from "@/components/common/LocationTabs";
import { FinalCTA } from "@/components/common/FinalCTA";

export const metadata: Metadata = {
 title: "Join a Service | CHH Europe",
 description: "Find a Christ Healing Home location near you and join us for worship.",
};

// Sample data - This will be fetched from API in the future
const locationTabs = [
 {
  id: "chh-uk",
  name: "CHH UK",
  locations: Array.from({ length: 13 }, (_, i) => ({
   slug: `chh-uk-location-${i + 1}`,
   title: `CHH London ${i + 1}`,
   serviceType: "Sunday Service",
   date: "Every Sunday, 10:00 AM",
   address: `${i + 1} Church Street, London, UK`,
   image: `https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=600&fit=crop`,
   mapLink: `https://maps.google.com/?q=${i + 1}+Church+Street+London+UK`
  }))
 },
 {
  id: "chh-europe",
  name: "CHH Europe",
  locations: Array.from({ length: 13 }, (_, i) => ({
   slug: `chh-europe-location-${i + 1}`,
   title: `CHH Paris ${i + 1}`,
   serviceType: "Sunday Worship",
   date: "Every Sunday, 11:00 AM",
   address: `${i + 1} Rue de la Paix, Paris, France`,
   image: `https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop`,
   mapLink: `https://maps.google.com/?q=${i + 1}+Rue+de+la+Paix+Paris+France`
  }))
 },
 {
  id: "chh-africa",
  name: "CHH Africa",
  locations: Array.from({ length: 13 }, (_, i) => ({
   slug: `chh-africa-location-${i + 1}`,
   title: `CHH Lagos ${i + 1}`,
   serviceType: "Sunday Celebration",
   date: "Every Sunday, 9:00 AM",
   address: `${i + 1} Victoria Island, Lagos, Nigeria`,
   image: `https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop`,
   mapLink: `https://maps.google.com/?q=${i + 1}+Victoria+Island+Lagos+Nigeria`
  }))
 },
 {
  id: "chh-campus",
  name: "CHH Campus",
  locations: Array.from({ length: 13 }, (_, i) => ({
   slug: `chh-campus-location-${i + 1}`,
   title: `CHH University ${i + 1}`,
   serviceType: "Campus Fellowship",
   date: "Every Friday, 6:00 PM",
   address: `Student Union, University Campus ${i + 1}`,
   image: `https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop`,
   mapLink: `https://maps.google.com/?q=Student+Union+University+Campus+${i + 1}`
  }))
 }
];

export default function JoinServicePage() {
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
       backgroundImage: "linear-gradient(rgba(89, 66, 123, 0.6), rgba(89, 66, 123, 0.6)), url('https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&h=1080&fit=crop')"
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
       description="We warmly invite you to join us for our Sunday and midweek gatherings, where you’ll experience
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
      <LocationTabs tabs={locationTabs} />
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
