import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/common/HeroSection";
import { MapPin, Phone, Mail, User } from "lucide-react";

export default async function BranchDetailPage({ params }: { params: { slug: string } }) {
 const { slug } = await params;

 return (
  <div className="flex min-h-screen flex-col">
   <Header />
   <main className="flex-1">
    <HeroSection
     title={`CHH ${slug.toUpperCase()}`}
     subtitle="Welcome home. We are glad you are here."
     backgroundImage="/assets/branches-hero.jpg"
     ctaText="Get Directions"
     ctaHref="#map"
    />

    <section className="py-20 bg-background">
     <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Info Column */}
      <div className="space-y-8">
       <div className="space-y-4">
        <h2 className="text-3xl font-bold text-primary">Service Times</h2>
        <div className="grid gap-4 bg-muted/30 p-6 rounded-lg border">
         <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold">Sunday Service</span>
          <span className="text-muted-foreground">9:00 AM & 11:30 AM</span>
         </div>
         <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold">Wednesday Bible Study</span>
          <span className="text-muted-foreground">6:30 PM</span>
         </div>
         <div className="flex justify-between items-center">
          <span className="font-semibold">Friday Prayer</span>
          <span className="text-muted-foreground">7:00 PM</span>
         </div>
        </div>
       </div>

       <div className="space-y-4">
        <h2 className="text-3xl font-bold text-primary">Leadership</h2>
        <div className="flex gap-4 items-center p-4 border rounded-lg bg-card shadow-sm">
         <div className="size-20 bg-muted rounded-full shrink-0 flex items-center justify-center">
          <User className="size-10 text-muted-foreground" />
         </div>
         <div>
          <h4 className="font-bold text-primary">Pastor Resident</h4>
          <p className="text-sm text-muted-foreground">Resident Pastor</p>
         </div>
        </div>
       </div>

       <div className="space-y-4">
        <h2 className="text-3xl font-bold text-primary">Contact Us</h2>
        <ul className="space-y-4">
         <li className="flex items-start space-x-3">
          <MapPin className="size-5 text-secondary shrink-0" />
          <span>123 Gospel Street, {slug.replace('-', ' ')} City</span>
         </li>
         <li className="flex items-center space-x-3">
          <Phone className="size-5 text-secondary shrink-0" />
          <span>+123 456 7890</span>
         </li>
         <li className="flex items-center space-x-3">
          <Mail className="size-5 text-secondary shrink-0" />
          <span>{slug}@chheurope.org</span>
         </li>
        </ul>
       </div>
      </div>

      {/* Map Column */}
      <div className="h-[500px] bg-muted w-full rounded-lg flex items-center justify-center relative overflow-hidden" id="map">
       <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
        <p className="text-muted-foreground font-semibold flex flex-col items-center">
         <MapPin className="size-12 mb-2 text-primary" />
         Google Map Placeholder ({slug})
        </p>
       </div>
      </div>
     </div>
    </section>
   </main>
   <Footer />
  </div>
 );
}
