"use client";

import { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
}

export function FormSelect({ label, options, error, placeholder, ...props }: FormSelectProps) {
  return (
    <div className="mb-5">
      <label className="block text-[16px] text-[#211F1F] font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          className={`w-full h-[50px] px-4 pr-12 text-[14px] border rounded-[8px] outline-none focus:ring-2 focus:ring-primary transition-all bg-white appearance-none cursor-pointer ${error ? "border-red-500" : "border-[#dde6f0]"
            } [&>option:first-child]:text-[#ACACAC]`}
        >
          <option value="" className="text-[#ACACAC]">
            {placeholder || `Select ${label.toLowerCase()}`}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <ChevronDown className="size-5 text-gray-400" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
