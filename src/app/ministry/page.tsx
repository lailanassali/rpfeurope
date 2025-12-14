import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { InfoCard } from "@/components/common/InfoCard";
import { Metadata } from "next";

export const metadata: Metadata = {
 title: "Ministries | CHH Europe",
 description: "Explore our ministries: University Fellowship, Men, Women, Youth, and Children.",
};

export default function MinistryPage() {
 const ministries = [
  {
   title: "University Fellowship",
   description: "A dynamic community for students to grow in faith, excel in academics, and impact their campus for Christ. We meet weekly for worship, bible study, and fellowship.",
   image: "/assets/university-ministry.jpg"
  },
  {
   title: "Men's Fellowship",
   description: "Men of Valor. Building strong men who lead their families and communities with integrity and godly wisdom. Join us for our monthly breakfast and prayer meetings.",
   image: "/assets/mens-ministry.jpg"
  },
  {
   title: "Women's Fellowship",
   description: "Daughters of Zion. Empowering women to fulfill their God-given potential through prayer, mentorship, and support networks. Every woman is a sister.",
   image: "/assets/womens-ministry.jpg"
  },
  {
   title: "Youth Church",
   description: "Generation Next. Focusing on the unique challenges and opportunities of today's youth. Energetic worship, relevant teaching, and authentic connection.",
   image: "/assets/youth-ministry.jpg"
  },
  {
   title: "Children's Church",
   description: "Kingdom Kids. Providing a safe and fun environment for children to learn about Jesus through bible stories, songs, and creative activities.",
   image: "/assets/children-ministry.jpg"
  },
 ];

 return (
  <div className="flex min-h-screen flex-col">
   <Header />
   <main className="flex-1">
    <HeroSection
     title="Our Ministries"
     subtitle="Discover where you belong. There is a place for everyone to serve and grow."
     backgroundImage="/assets/ministry-hero.jpg"
    />

    <section className="py-20 bg-background">
     <div className="container px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {ministries.map((ministry, i) => (
        <InfoCard
         key={i}
         title={ministry.title}
         description={ministry.description}
         imageUrl={ministry.image}
         ctaText="Learn More"
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
