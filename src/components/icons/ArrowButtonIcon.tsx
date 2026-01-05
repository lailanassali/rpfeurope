"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface ArrowButtonIconProps {
 bgColor?: string;
 borderColor?: string;
 arrowColor?: string;
 className?: string;
}

export function ArrowButtonIcon({
 bgColor = "#CCCCCC",
 borderColor = "black",
 arrowColor = "black",
 className
}: ArrowButtonIconProps) {
 const clipId = useId();

 return (
  <svg
   width="34"
   height="34"
   viewBox="0 0 34 34"
   fill="none"
   xmlns="http://www.w3.org/2000/svg"
   className={cn("shrink-0", className)}
  >
   <rect x="0.25" y="0.25" width="33.5" height="33.5" rx="3.75" fill={bgColor} />
   <rect x="0.25" y="0.25" width="33.5" height="33.5" rx="3.75" stroke={borderColor} strokeWidth="0.5" />
   <g clipPath={`url(#${clipId})`}>
    <path d="M18.05 17.3601L12.394 23.0181L10.98 21.6031L16.637 15.9471L11.687 10.9971H23V22.3101L18.05 17.3601Z" fill={arrowColor} />
   </g>
   <defs>
    <clipPath id={clipId}>
     <rect width="24" height="24" fill="white" transform="translate(5 5)" />
    </clipPath>
   </defs>
  </svg>
 );
}
