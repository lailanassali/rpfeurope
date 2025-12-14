import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { InfoCard } from "@/components/common/InfoCard";

export default function EventsPage() {
 const events = [
  {
   title: "Sunday Divine Service",
   description: "Join us for a time of refreshing in God's presence. Worship, Word, and Spirit.",
   date: "Every Sunday, 10:00 AM",
   image: "/assets/service-event.jpg",
   slug: "sunday-service"
  },
  {
   title: "Midweek Bible Study",
   description: "Digging deep into the scriptures. Come with your questions and a heart ready to learn.",
   date: "Wednesdays, 6:00 PM",
   image: "/assets/bible-study.jpg",
   slug: "midweek-study"
  },
  {
   title: "Annual Youth Convention",
   description: "A 3-day power packed event for young people. Music, guest speakers, and workshops.",
   date: "Dec 15-18",
   image: "/assets/youth-event.jpg",
   slug: "youth-convention"
  },
  {
   title: "Christmas Carol Service",
   description: "Celebrating the birth of our Savior with songs and hymns.",
   date: "Dec 24, 5:00 PM",
   image: "/assets/christmas-event.jpg",
   slug: "christmas-carol"
  },
 ];

 return (
  <div className="flex min-h-screen flex-col">
   <Header />
   <main className="flex-1">
    <HeroSection
     title="Upcoming Events"
     subtitle="Stay updated with our latest programs and gatherings."
     backgroundImage="/assets/events-hero.jpg"
    />

    <section className="py-20 bg-background">
     <div className="container px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {events.map((event, i) => (
        <InfoCard
         key={i}
         title={event.title}
         description={event.description}
         imageUrl={event.image}
         date={event.date}
         href={`/events/${event.slug}`}
         ctaText="View Details"
         className="h-full"
        />
       ))}
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
}
