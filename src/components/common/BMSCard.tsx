import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BMSCardProps {
 title: string;
 description: string;
 schedule: string;
 image: string;
 linkText?: string;
 linkHref?: string;
 badge?: {
  text: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
 };
}

export function BMSCard({
 title,
 description,
 schedule,
 image,
 linkText,
 linkHref,
 badge
}: BMSCardProps) {
 return (
  <div className="overflow-hidden rounded-[4px]">
   {/* Image */}
   <div className="relative h-[275px] w-full overflow-hidden">
    <img
     src={image}
     alt={title}
     className="w-full h-full object-cover"
    />
   </div>

   {/* Content */}
   <div className=" p-6">
    <h3 className="text-[24px] font-bold text-black mb-2">{title}</h3>
    <p className="text-[16px] text-black/80 mb-3">{description}</p>
    <p className="text-[14px] text-black/60 mb-4">{schedule}</p>

    {/* Link or Badge */}
    {linkText && linkHref && (
     <Link
      href={linkHref}
      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
     >
      {linkText}
      <ArrowRight className="size-4" />
     </Link>
    )}

    {badge && (
     <div
      className="inline-block px-4 py-2 rounded-lg text-sm font-semibold"
      style={{
       backgroundColor: badge.bgColor || "white",
       color: badge.textColor || "#A25F20",
       border: `1px solid ${badge.borderColor || "#A25F20"}`
      }}
     >
      {badge.text}
     </div>
    )}
   </div>
  </div>
 );
}
