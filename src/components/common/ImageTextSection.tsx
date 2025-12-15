import Image from "next/image";

interface ImageTextSectionProps {
 heading: string;
 description: string;
 image: string;
 imagePosition?: "left" | "right";
 backgroundColor?: string;
 paddingY?: string;
 gap?: string;
 imageHeight?: string;
 quote?: string;
}

export function ImageTextSection({
 heading,
 description,
 image,
 imagePosition = "right",
 backgroundColor = "transparent",
 paddingY = "104px",
 gap = "72px",
 imageHeight = "500px",
 quote
}: ImageTextSectionProps) {
 return (
  <section style={{ backgroundColor, paddingTop: paddingY, paddingBottom: paddingY }}>
   <div className="container w-11/12 mx-auto px-4">
    <div
     className={`flex items-center ${imagePosition === "left" ? "flex-row-reverse" : ""}`}
     style={{ gap }}
    >
     {/* Text - aligned left */}
     <div className="flex-3 text-left">
      <h2 className="text-[48px] font-bold mb-6" style={{ color: "#111111" }}>
       {heading}
      </h2>
      <div className="text-[20px] whitespace-pre-line" style={{ color: "#373737" }}>
       {description}
      </div>
      {quote && (
       <p className="text-[24px] font-normal mt-8" style={{ color: "#463460" }}>
        {quote}
       </p>
      )}
     </div>

     {/* Image - aligned center */}
     <div className="flex-2 flex items-center justify-center">
      <div className="relative w-full overflow-hidden rounded-lg" style={{ height: imageHeight }}>
       <Image
        src={image}
        alt={heading}
        fill
        className="object-cover"
       />
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}
