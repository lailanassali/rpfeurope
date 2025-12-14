"use client";

import { TextareaHTMLAttributes } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function FormTextarea({ label, error, placeholder, ...props }: FormTextareaProps) {
  return (
    <div className="mb-4">
      <label className="block text-[16px] text-[#211F1F] font-medium mb-2">
        {label}
      </label>
      <textarea
        {...props}
        rows={4}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={`w-full px-4 py-3 text-[14px] border rounded-[8px] outline-none focus:ring-2 focus:ring-primary transition-all resize-none placeholder:text-[#ACACAC] placeholder:text-[14px] ${error ? "border-red-500" : "border-[#dde6f0]"
          }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
