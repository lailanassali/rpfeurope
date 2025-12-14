"use client";

import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, placeholder, ...props }: FormInputProps) {
  return (
    <div className="mb-5">
      <label className="block text-[16px] text-[#211F1F] font-medium mb-2">
        {label}
      </label>
      <input
        {...props}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={`w-full h-[50px] px-4 text-[14px] border rounded-[8px] outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-[#ACACAC] placeholder:text-[14px] ${error ? "border-red-500" : "border-[#dde6f0]"
          }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
