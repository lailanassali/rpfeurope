import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
 // In a real app, fetch event data based on params.slug
 const { slug } = await params;

 return (
  <div className="flex min-h-screen flex-col">
   <Header />
   <main className="flex-1">
    <HeroSection
     title="Event Details"
     subtitle={`Learn more about ${slug.replace('-', ' ')}`}
     backgroundImage="/assets/events-hero.jpg"
     ctaText="Back to Events"
     ctaHref="/events"
    />

    <section className="py-20 bg-background">
     <div className="container px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
       <div className="rounded-lg overflow-hidden h-[400px] bg-muted bg-cover bg-center" style={{ backgroundImage: "url('/assets/event-detail.jpg')" }} />
       <h2 className="text-3xl font-bold text-primary">About This Event</h2>
       <div className="prose max-w-none text-muted-foreground leading-relaxed">
        <p>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
         Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
       </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-8">
       <div className="p-6 bg-muted/30 rounded-lg border space-y-6">
        <h3 className="font-bold text-xl text-primary">Event Information</h3>
        <div className="space-y-4">
         <div className="flex items-start space-x-3 text-sm">
          <Calendar className="size-5 text-secondary shrink-0" />
          <div>
           <p className="font-semibold text-foreground">Date</p>
           <p className="text-muted-foreground">Sunday, December 24, 2025</p>
          </div>
         </div>
         <div className="flex items-start space-x-3 text-sm">
          <Clock className="size-5 text-secondary shrink-0" />
          <div>
           <p className="font-semibold text-foreground">Time</p>
           <p className="text-muted-foreground">10:00 AM - 12:00 PM</p>
          </div>
         </div>
         <div className="flex items-start space-x-3 text-sm">
          <MapPin className="size-5 text-secondary shrink-0" />
          <div>
           <p className="font-semibold text-foreground">Location</p>
           <p className="text-muted-foreground">Main Auditorium, CHH Europe HQ</p>
          </div>
         </div>
        </div>
        <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
         Register Now
        </Button>
       </div>

       <div className="p-6 bg-primary text-white rounded-lg">
        <h3 className="font-bold text-lg mb-2">Have Questions?</h3>
        <p className="text-sm opacity-90 mb-4">Contact our events team for more information.</p>
        <Link href="/connect" className="text-secondary hover:underline text-sm font-semibold">Contact Us &rarr;</Link>
       </div>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
}
