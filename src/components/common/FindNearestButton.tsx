"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ChhButton } from "./ChhButton";
import { getUserLocation } from "@/lib/geolocation-utils";
import { toast } from "react-hot-toast";

export function FindNearestButton() {
 const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);

 const handleFindNearest = async () => {
  setIsLoading(true);

  try {
   // Get user's location
   const userLocation = await getUserLocation();
   // Redirect to nearest locations page with coordinates and limit
   router.push(`/nearest-locations?lat=${userLocation.latitude}&lon=${userLocation.longitude}`);
  } catch (error) {
   console.error("Error finding nearest branch:", error);
   toast.error(
    error instanceof Error ? error.message : "Failed to get your location. Please try again.",
    { id: "geolocation" }
   );
   setIsLoading(false);
  }
 };

 return (
  <ChhButton
   onClick={handleFindNearest}
   disabled={isLoading}
   className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-10 md:h-[54px] md:px-6 px-3 py-0 md:py-3 md:text-xl text-md md:min-w-[240px] rounded-[4px]"
  >
   <span>{isLoading ? "Finding..." : "Find your nearest branch"}</span>
   <ArrowRight className="size-5" />
  </ChhButton>
 );
}
