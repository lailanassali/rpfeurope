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
  <section
   className="py-[50px] md:py-[(--padding-y)]"
   style={{
    backgroundColor,
    "--padding-y": paddingY
   } as React.CSSProperties}
  >
   <div className="container w-11/12 mx-auto px-4">
    <div
     className={`flex items-center md:flex-row flex-col gap-8 md:gap-(--md-gap) ${imagePosition === "left" ? "md:flex-row-reverse" : ""}`}
     style={{ "--md-gap": gap } as React.CSSProperties}
    >
     {/* Text - aligned left */}
     <div className="md:flex-3 flex-1 text-left">
      <h2 className="text-[24px] font-bold mb-6 md:text-[48px]" style={{ color: "#111111" }}>
       {heading}
      </h2>
      <div className="text-[16px] md:text-[20px] whitespace-pre-line" style={{ color: "#373737" }}>
       {description}
      </div>
      {quote && (
       <p className="text-[18px] md:text-[24px] font-normal mt-8" style={{ color: "#463460" }}>
        {quote}
       </p>
      )}
     </div>

     {/* Image - aligned center */}
     <div className="md:flex-2 w-full flex-1 flex items-center justify-center">
      <div
       className="relative w-full overflow-hidden rounded-lg h-[400px] md:h-[(--image-height)]"
       style={{ "--image-height": imageHeight } as React.CSSProperties}
      >
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
