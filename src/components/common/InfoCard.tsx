import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
 title: string;
 description: string;
 imageUrl?: string;
 date?: string;
 href?: string;
 ctaText?: string;
 className?: string;
 variant?: "vertical" | "horizontal";
}

export function InfoCard({
 title,
 description,
 imageUrl = "/assets/card-placeholder.jpg",
 date,
 href = "#",
 ctaText = "Read More",
 className,
 variant = "vertical",
}: InfoCardProps) {
 return (
  <Card className={cn("overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-secondary", className)}>
   <div className={cn("relative", variant === "horizontal" ? "md:flex" : "")}>
    {/* Image Section */}
    <div
     className={cn(
      "bg-muted bg-cover bg-center shrink-0",
      variant === "vertical" ? "h-48 w-full" : "h-48 md:h-auto md:w-2/5"
     )}
     style={{ backgroundImage: `url(${imageUrl})` }}
    />

    {/* Content Section */}
    <div className="flex flex-col flex-1">
     <CardHeader className="pb-2">
      {date && (
       <div className="flex items-center text-sm text-muted-foreground mb-1">
        <Calendar className="mr-2 size-4 text-secondary" />
        {date}
       </div>
      )}
      <h3 className="text-xl font-bold leading-tight text-primary">{title}</h3>
     </CardHeader>
     <CardContent className="py-2 flex-grow">
      <p className="text-muted-foreground text-sm line-clamp-3">
       {description}
      </p>
     </CardContent>
     <CardFooter className="pt-2 pb-6">
      <Button asChild variant="link" className="p-0 h-auto font-semibold text-secondary hover:text-secondary/80">
       <Link href={href} className="flex items-center group">
        {ctaText}
        <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
       </Link>
      </Button>
     </CardFooter>
    </div>
   </div>
  </Card>
 );
}
