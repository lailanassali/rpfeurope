"use client";

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
    small: "text-[30px] md:text-[36px]",
    medium: "text-[40px] md:text-[48px]",
    large: "text-[60px] md:text-[60px]",
    xlarge: "text-[72px] md:text-[72px]",
  };

  return (
    <div className={cn("flex flex-col", alignmentClasses, className)}>


      {heading && (
        <h1 className={cn("font-bold leading-tight", headingSizeClasses[headingSize], colorClasses)}>
          {heading}
        </h1>
      )}

      {description && (
        <div className={cn("text-[18px] leading-relaxed mt-[16px]",
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
        <blockquote className="text-[36px] text-center leading-relaxed text-primary mt-[48px]">
          "{quote}"
        </blockquote>
      )}

      {(primaryButton || secondaryButton) && (
        <div className="flex flex-wrap gap-4 mt-[24px]">
          {primaryButton && (
            <button
              onClick={primaryButton.onClick}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "bg-chh-purple text-chh-purple-foreground hover:bg-chh-purple/90",
                "font-semibold text-xl px-8 h-14 rounded-[4px]",
                "transition-colors"
              )}
            >
              {primaryButton.text}
              {primaryButton.icon && <ArrowRight className="size-5" />}
            </button>

          )}

          {secondaryButton && (
            <button
              onClick={secondaryButton.onClick}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "font-semibold text-xl px-8 h-14 rounded-[4px]",
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

          )}
        </div>
      )}
    </div>
  );
}
