"use client";

import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RPFButtonProps extends ButtonProps {
 backgroundColor?: string;
 textColor?: string;
 fontSize?: string | number;
 fontWeight?: string | number;
 hasIcon?: boolean;
 iconPosition?: "left" | "right";
 icon?: React.ElementType;
 isOutline?: boolean; // Using 'variant="outline"' is preferred, but mapping this for back-compat with user request
 isLoading?: boolean;
}

const RPFButton = React.forwardRef<HTMLButtonElement, RPFButtonProps>(
 (
  {
   className,
   children,
   backgroundColor,
   textColor,
   fontSize,
   fontWeight,
   hasIcon = false,
   iconPosition = "left",
   icon: Icon,
   isOutline = false,
   isLoading = false,
   style,
   variant, // Capture variant to potentially override or default
   disabled,
   ...props
  },
  ref
 ) => {
  // Determine variant based on isOutline if not explicitly passed
  const finalVariant = variant || (isOutline ? "outline" : "default");

  // Computed style object for dynamic props
  const customStyle: React.CSSProperties = {
   ...(backgroundColor && finalVariant !== "outline" ? { backgroundColor } : {}),
   ...(backgroundColor && finalVariant === "outline" ? { borderColor: backgroundColor, color: backgroundColor, border: "0.5px solid" } : {}),
   ...(textColor ? { color: textColor } : {}),
   ...(fontSize ? { fontSize } : {}),
   ...(fontWeight ? { fontWeight } : {}),
   ...style,
  };

  return (
   <Button
    ref={ref}
    variant={finalVariant}
    className={cn(className)}
    style={customStyle}
    disabled={disabled || isLoading}
    {...props}
   >
    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

    {!isLoading && hasIcon && Icon && iconPosition === "left" && (
     <Icon className="mr-2 h-4 w-4" />
    )}

    {children}

    {!isLoading && hasIcon && Icon && iconPosition === "right" && (
     <Icon className="ml-2 h-4 w-4" />
    )}
   </Button>
  );
 }
);
RPFButton.displayName = "RPFButton";

export { RPFButton };
