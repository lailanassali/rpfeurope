"use client";

import { ArrowRight } from "lucide-react";
import { ChhButton } from "./ChhButton";
import Link from "next/link";

interface ButtonProps {
 text: string;
 href: string;
 isOutline?: boolean;
}

interface HeroTextProps {
 heading: string;
 subtitle?: string;
 primaryButton?: ButtonProps;
 secondaryButton?: ButtonProps;
 headingSize?: number;
 headingWeight?: number;
 subtitleSize?: number;
 subtitleWeight?: number;
}

export function HeroText({
 heading,
 subtitle,
 primaryButton,
 secondaryButton,
 headingSize = 36,
 headingWeight = 700,
 subtitleSize = 20,
 subtitleWeight = 500
}: HeroTextProps) {
 return (
  <div className="py-9 px-8 md:py-[43px] md:px-[80px] relative w-full md:w-1/2">
   <div className="w-full">
    <h2
     className={`text-white md:mb-3 mb-1 text-[24px] md:text-[${headingSize}px] font-bold md:font-[${headingWeight}]`}
    >
     {heading}
    </h2>
    {subtitle && <p
     className={`text-white/90 w-full text-[16px] md:text-[${subtitleSize}px] font-medium md:font-[${subtitleWeight}]`}
    >
     {subtitle}
    </p>}
   </div>
   {(primaryButton || secondaryButton) && (
    <div className="flex md:gap-6 gap-2 justify-between md:justify-normal mt-4 md:mt-8">
     {primaryButton && (
      <Link href={primaryButton.href}>
       <ChhButton className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-10 md:h-[54px] md:px-6 px-3 py-0 md:py-3 md:text-xl text-md md:min-w-[240px] rounded-[4px]">
        <span>{primaryButton.text}</span>
        <ArrowRight className="size-5" />
       </ChhButton>
      </Link>
     )}
     {secondaryButton && (
      <Link href={secondaryButton.href}>
       <ChhButton
        className="bg-transparent text-white hover:bg-primary/90 font-semibold h-10 md:h-[54px] md:px-6 px-3 py-0 md:py-3 md:text-xl text-md md:min-w-[240px] rounded-[4px]"
        isOutline
       >
        <span>{secondaryButton.text}</span>
        <ArrowRight className="size-5" />
       </ChhButton>
      </Link>
     )}
    </div>
   )}
  </div>
 );
}
