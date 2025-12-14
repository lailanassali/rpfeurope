"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuItemProps {
 title: string;
 href?: string;
 description?: string;
 icon?: React.ReactNode;
 children?: MenuItemProps[];
 isDropdown?: boolean;
 onClick?: () => void;
 className?: string;
}

export function MenuItem({
 title,
 href,
 description,
 icon,
 children,
 isDropdown = false,
 onClick,
 className,
}: MenuItemProps) {
 const [isOpen, setIsOpen] = React.useState(false);

 const handleClick = () => {
  if (isDropdown && children && children.length > 0) {
   setIsOpen(!isOpen);
  } else if (onClick) {
   onClick();
  }
 };

 // Desktop dropdown menu item
 if (isDropdown && children && children.length > 0) {
  return (
   <div className="relative group">
    <button
     onClick={handleClick}
     className={cn(
      "flex items-center gap-1 font-medium transition-colors hover:text-primary",
      "text-black text-[18px] p-[10px]",
      className
     )}
    >
     {title}
     <ChevronDown className="size-4" />
    </button>

    {/* Dropdown content */}
    <div className="absolute left-0 top-full mt-2 w-[550px] bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
     <div className="grid grid-cols-2 gap-4 p-4">
      {children.map((child, index) => (
       <Link
        key={index}
        href={child.href || "#"}
        className={cn(
         "block p-3 hover:bg-muted transition-colors",
         index < children.length - 2 && "border-b border-border"
        )}
       >
        <h4 className="font-medium text-black mb-1 text-[14px]">
         {child.title}
        </h4>
        {child.description && (
         <p className="text-[12px] text-[#000000B2]">
          {child.description}
         </p>
        )}
       </Link>
      ))}
     </div>
    </div>
   </div>
  );
 }

 // Drawer menu item with icon
 if (icon) {
  return (
   <Link
    href={href || "#"}
    onClick={onClick}
    className={cn(
     "flex items-center gap-[11px] pb-[12px] transition-colors hover:text-primary",
     className
    )}
   >
    <div className="flex-shrink-0 mt-1 text-[#000000B2]">{icon}</div>
    <div className="flex-1">
     <h3 className="font-medium text-[14px] text-black mb-1">{title}</h3>
     {description && (
      <p className="text-[12px] text-black text-[#000000B2]">{description}</p>
     )}
    </div>
   </Link>
  );
 }

 // Simple link item
 return (
  <Link
   href={href || "#"}
   onClick={onClick}
   className={cn(
    "text-sm font-medium transition-colors hover:text-primary text-black text-[18px] p-[10px]",
    className
   )}
  >
   {title}
  </Link>
 );
}
