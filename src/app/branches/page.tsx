import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { InfoCard } from "@/components/common/InfoCard";

export default function BranchesPage() {
 const branches = [
  {
   title: "CHH Europe HQ",
   description: "Our main campus located in the heart of the city. Join us for powerful worship and fellowship.",
   image: "/assets/branch-hq.jpg",
   slug: "hq"
  },
  {
   title: "CHH London",
   description: "Serving the London community with grace and truth.",
   image: "/assets/branch-london.jpg",
   slug: "london"
  },
  {
   title: "CHH Manchester",
   description: "A vibrant family of believers in Manchester.",
   image: "/assets/branch-manchester.jpg",
   slug: "manchester"
  },
  {
   title: "CHH Berlin",
   description: "Spreading the light of Christ in Germany.",
   image: "/assets/branch-berlin.jpg",
   slug: "berlin"
  },
 ];

 return (
  <div className="flex min-h-screen flex-col">
   <Header />
   <main className="flex-1">
    <HeroSection
     title="Our Locations"
     subtitle="Find a CHH branch near you. We are one family in many locations."
     backgroundImage="/assets/branches-hero.jpg"
    />

    <section className="py-20 bg-background">
     <div className="container px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {branches.map((branch, i) => (
        <InfoCard
         key={i}
         title={branch.title}
         description={branch.description}
         imageUrl={branch.image}
         href={`/branches/${branch.slug}`}
         ctaText="View Branch Details"
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
