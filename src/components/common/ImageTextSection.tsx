import Image from "next/image";

interface ImageTextSectionProps {
 heading: string;
 text: string;
 image: string;
 imagePosition?: "left" | "right";
 headingAlignment?: "left" | "center";
 textColor?: "black" | "white";
 imageTitle?: string;
}

export function ImageTextSection({
 heading,
 text,
 image,
 imagePosition = "left",
 headingAlignment = "left",
 textColor = "black",
 imageTitle
}: ImageTextSectionProps) {
 const headingAlign = headingAlignment === "center" ? "text-center" : "text-left";
 const textColorClass = textColor === "white" ? "text-white" : "text-black";

 return (
  <div className="container w-11/12 mx-auto px-4">
   <h2 className={`text-[48px] font-bold ${textColorClass} mb-8 ${headingAlign}`}>
    {heading}
   </h2>
   <div className={`flex gap-12 items-center ${imagePosition === "right" ? "flex-row-reverse" : ""}`}>
    {/* Image - 45% */}
    <div className="w-[45%]">
     {imageTitle && (
      <h3 className="text-[32px] font-bold text-white mb-4">{imageTitle}</h3>
     )}
     <div className="relative h-[520px] overflow-hidden rounded-lg">
      <Image
       src={image}
       alt={heading}
       fill
       className="object-cover"
      />
     </div>
    </div>

    {/* Text - 60% */}
    <div className="w-[60%]">
     <p className={`text-[18px] font-normal ${textColorClass} leading-relaxed whitespace-pre-line`}>
      {text}
     </p>
    </div>
   </div>
  </div>
 );
}
