import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
 title: string;
 subtitle?: string;
 ctaText?: string;
 ctaHref?: string;
 backgroundImage?: string;
 className?: string;
 overlayColor?: string; // Optional custom overlay
}

export function HeroSection({
 title,
 subtitle,
 ctaText = "Learn More",
 ctaHref = "/about",
 backgroundImage = "/assets/hero-placeholder.jpg",
 className,
}: HeroSectionProps) {
 return (
  <section
   className={cn(
    "relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-cover bg-center",
    className
   )}
   style={{ backgroundImage: `url(${backgroundImage})` }}
  >
   {/* Overlay */}
   <div className="absolute inset-0 bg-primary/70" />

   {/* Content */}
   <div className="relative container px-4 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-1000">
    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl">
     {title}
    </h1>
    {subtitle && (
     <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
      {subtitle}
     </p>
    )}
    <div className="pt-4">
     <Button
      asChild
      size="lg"
      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 py-6 text-lg"
     >
      <Link href={ctaHref}>{ctaText}</Link>
     </Button>
    </div>
   </div>
  </section>
 );
}
