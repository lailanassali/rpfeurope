import Link from "next/link";
import { RPFButton } from "./RPFButton";
import { ArrowRight } from "lucide-react";

interface DevotionalCardProps {
 volume: string;
 title: string;
 author: string;
 description: string;
 buttonText: string;
 buttonHref: string;
 image: string;
 badge?: {
  text: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
 };
}

export function DevotionalCard({
 volume,
 title,
 author,
 description,
 buttonText,
 buttonHref,
 image,
 badge
}: DevotionalCardProps) {
 return (
  <div
   className="rounded-[4px] border border-[#e5e5e5] p-[10px_20px] max-h-[260px] flex overflow-hidden"
   style={{ boxShadow: "0px 2px 10px 0px #0000000D" }}
  >
   {/* Image - Left */}
   <div className="w-[140px] h-full shrink-0 relative">
    <img
     src={image}
     alt={`${volume} - ${title}`}
     className="w-full h-full object-cover rounded"
    />

   </div>

   {/* Content - Right */}
   <div className="flex-1 ml-4 flex flex-col">
    <h3 className="text-[20px] font-semibold text-black line-clamp-1">
     {volume} - {title}
    </h3>
    <p className="text-[12px] text-black mt-1 line-clamp-1">
     {author}
    </p>
    <p className="text-[14px] text-black mt-[10px] mb-8 line-clamp-3 flex-1">
     {description}
    </p>
    {buttonHref &&
     <Link href={buttonHref} className="mt-auto">
      <RPFButton
       className="bg-[#6F5299] text-white hover:bg-[#6F5299]/90 h-12 rounded-[4px]"
      >
       <span>{buttonText || "Read Devotional"}</span>
       <ArrowRight className="size-4" />
      </RPFButton>
     </Link>}
    {badge && (
     <div
      className="absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm z-10"
      style={{
       backgroundColor: badge.bgColor,
       color: badge.textColor,
       borderColor: badge.borderColor
      }}
     >
      {badge.text}
     </div>
    )}
   </div>
  </div>
 );
}
