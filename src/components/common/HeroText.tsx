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
  <div className="py-[43px] px-[80px] relative">
   <div className="">
    <h2
     className="text-white mb-[12px]"
     style={{ fontSize: `${headingSize}px`, fontWeight: headingWeight }}
    >
     {heading}
    </h2>
    {subtitle && <p
     className="text-white/90"
     style={{ fontSize: `${subtitleSize}px`, fontWeight: subtitleWeight }}
    >
     {subtitle}
    </p>}
   </div>
   {(primaryButton || secondaryButton) && (
    <div className="flex gap-[24px] mt-[32px]">
     {primaryButton && (
      <Link href={primaryButton.href}>
       <ChhButton className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-[54px] px-[24px] py-[12px] text-[20px] min-w-[240px] rounded-[4px]">
        <span>{primaryButton.text}</span>
        <ArrowRight className="size-5" />
       </ChhButton>
      </Link>
     )}
     {secondaryButton && (
      <Link href={secondaryButton.href}>
       <ChhButton
        className="bg-transparent text-white hover:bg-primary/90 font-semibold h-[54px] px-[24px] py-[12px] text-[20px] min-w-[240px] rounded-[4px]"
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
