import Link from "next/link";

interface LocationCardProps {
 location: string;
 image: string;
 href?: string;
 description?: string;
}

export function LocationCard({ location, image, href = "/locations", description }: LocationCardProps) {
 return (
  <Link href={href} className="relative md:h-[467px] h-[300px] overflow-hidden group cursor-pointer" style={{ borderRadius: '4px' }}>
   <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
    style={{
     backgroundColor: "#D1D5DB",
     backgroundImage: `url('${image}')`
    }}
   />
   <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent group-hover:opacity-0 transition-opacity duration-300" />

   <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300" style={{ backgroundColor: "#0000004D" }}>
    <p className="text-white text-lg font-semibold">{location}</p>
   </div>

   {/* Hover Overlay */}
   {description && <div className="absolute inset-0 bg-[#6F5299] opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col items-start justify-center p-6 text-left">
    <h4 className="text-white text-xl font-bold mb-3">{location}</h4>
    <p className="text-white text-base">
     {description}
    </p>
   </div>}
  </Link>
 );
}
