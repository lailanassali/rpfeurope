import Link from "next/link";

interface LocationCardProps {
 location: string;
 image: string;
 href?: string;
}

export function LocationCard({ location, image, href = "/locations" }: LocationCardProps) {
 return (
  <Link href={href} className="relative md:h-[467px] h-[300px] overflow-hidden group cursor-pointer" style={{ borderRadius: '4px' }}>
   <div
    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
    style={{
     backgroundColor: "#D1D5DB",
     backgroundImage: `url('${image}')`
    }}
   />
   <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
   <div className="absolute bottom-0 left-0 right-0 p-6" style={{ backgroundColor: "#0000004D" }}>
    <p className="text-white text-lg font-semibold">{location}</p>
   </div>
  </Link>
 );
}
