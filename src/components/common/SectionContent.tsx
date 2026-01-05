"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionContentProps {
  heading?: string;
  description?: string;
  quote?: string;
  primaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
    icon?: boolean;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
    icon?: boolean;
    isOutline?: boolean;
  };
  alignment?: "left" | "center";
  textColor?: "white" | "dark";
  headingSize?: "small" | "medium" | "large" | "xlarge";
  className?: string;
}

export function SectionContent({
  heading,
  description,
  quote,
  primaryButton,
  secondaryButton,
  alignment = "left",
  textColor = "dark",
  headingSize = "medium",
  className,
}: SectionContentProps) {
  const alignmentClasses = alignment === "center" ? "text-center items-center" : "text-left items-start";
  const colorClasses = textColor === "white" ? "text-white" : "text-foreground";

  const headingSizeClasses = {
    small: "text-[20px] md:text-[36px]",
    medium: "text-[28px] md:text-[48px]",
    large: "text-[30px] md:text-[60px]",
    xlarge: "text-[52px] md:text-[72px]",
  };

  return (
    <div className={cn("flex flex-col", alignmentClasses, className)}>


      {heading && (
        <h1 className={cn("font-bold leading-tight md:text-left text-center w-full", headingSizeClasses[headingSize], colorClasses)}>
          {heading}
        </h1>
      )}

      {description && (
        <div className={cn("md:text-lg text-base leading-relaxed mt-[16px] w-full md:w-10/12",
          textColor === "white" ? "text-white/90" : "text-black"
        )}>
          {description.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            )
          ))}
        </div>
      )}

      {quote && (
        <blockquote className="md:text-4xl text-xl text-center leading-relaxed text-primary md:mt-[48px] mt-6">
          "{quote}"
        </blockquote>
      )}

      {(primaryButton || secondaryButton) && (
        <div className="flex flex-wrap gap-4 md:mt-6 mt-4 md:justify-normal justify-center">
          {primaryButton && (
            primaryButton.href ? (
              <Link
                href={primaryButton.href}
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "bg-chh-purple text-chh-purple-foreground hover:bg-chh-purple/90",
                  "font-semibold md:text-xl text-base px-4 h-8 md:px-8 md:h-14 rounded-[4px]",
                  "transition-colors"
                )}
              >
                {primaryButton.text}
                {primaryButton.icon && <ArrowRight className="size-5" />}
              </Link>
            ) : (
              <button
                onClick={primaryButton.onClick}
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "bg-chh-purple text-chh-purple-foreground hover:bg-chh-purple/90",
                  "font-semibold md:text-xl text-base px-4 h-8 md:px-8 md:h-14 rounded-[4px]",
                  "transition-colors"
                )}
              >
                {primaryButton.text}
                {primaryButton.icon && <ArrowRight className="size-5" />}
              </button>
            )
          )}

          {secondaryButton && (
            secondaryButton.href ? (
              <Link
                href={secondaryButton.href}
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "font-semibold md:text-xl text-base px-4 h-10 md:px-8 md:h-14",
                  "transition-colors",
                  secondaryButton.isOutline
                    ? textColor === "white"
                      ? "border-[0.5px] border-white text-white hover:bg-white hover:text-chh-purple"
                      : "border-[0.5px] border-chh-purple text-chh-purple hover:bg-chh-purple hover:text-white"
                    : "bg-chh-purple text-chh-purple-foreground hover:bg-chh-purple/90"
                )}
              >
                {secondaryButton.text}
                {secondaryButton.icon && <ArrowRight className="size-5" />}
              </Link>
            ) : (
              <button
                onClick={secondaryButton.onClick}
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "font-semibold md:text-xl text-base px-4 h-10 md:px-8 md:h-14",
                  "transition-colors",
                  secondaryButton.isOutline
                    ? textColor === "white"
                      ? "border-[0.5px] border-white text-white hover:bg-white hover:text-chh-purple"
                      : "border-[0.5px] border-chh-purple text-chh-purple hover:bg-chh-purple hover:text-white"
                    : "bg-chh-purple text-chh-purple-foreground hover:bg-chh-purple/90"
                )}
              >
                {secondaryButton.text}
                {secondaryButton.icon && <ArrowRight className="size-5" />}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
