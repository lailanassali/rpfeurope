import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CardComponentProps {
 image: string;
 title: string;
 description: string;
 linkHref?: string;
 linkText?: string;
 textBgColor?: string;
 descriptionClassName?: string;
 badge?: {
  title: string;
  bgColor?: string;
  textColor?: string;
 };
}

export function CardComponent({
 image,
 title,
 description,
 linkHref = "/connect",
 linkText = "Learn more",
 textBgColor = "#EDEBE433",
 descriptionClassName,
 badge
}: CardComponentProps) {
 return (
  <div className="group cursor-pointer rounded-xl overflow-hidden">
   <div
    className="h-64 bg-muted overflow-hidden relative"
    style={{
     backgroundColor: "#E5E7EB",
     backgroundImage: `url('${image}')`,
     backgroundSize: "cover",
     backgroundPosition: "center"
    }}
   >
    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
   </div>
   <div className="space-y-2 py-6" style={{ backgroundColor: textBgColor }}>
    <h3 className="text-xl font-semibold text-black group-hover:text-black transition-colors px-5">
     {title}
    </h3>
    <p className={`text-black text-sm leading-relaxed px-5 ${descriptionClassName || ''}`}>
     {description}
    </p>
    <div className="flex items-center justify-between">
     <Link
      href={linkHref}
      className="inline-flex items-center text-primary font-medium text-base mt-3.5 hover:text-primary transition-colors px-5"
     >
      {linkText} <ArrowRight className="ml-2 size-4" />
     </Link>
     {badge && (
      <span
       className="px-3 py-2 rounded-lg text-sm"
       style={{
        backgroundColor: badge.bgColor || "#FF8C00",
        color: badge.textColor || "#FFFFFF"
       }}
      >
       {badge.title || "Upcoming"}
      </span>
     )}
    </div>
   </div>
  </div>
 );
}
