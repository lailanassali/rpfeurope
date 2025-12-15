"use client";

interface PermissionCheckboxProps {
 title: string;
 label: string;
 checked: boolean;
 onChange: (checked: boolean) => void;
}

export function PermissionCheckbox({ title, label, checked, onChange }: PermissionCheckboxProps) {
 return (
  <div className="mb-6">
   <h3 className="text-[20px] font-semibold mb-4" style={{ color: "#373737" }}>
    {title}
   </h3>
   <label className="flex items-center gap-3 cursor-pointer">
    <div
     className="flex items-center justify-center shrink-0 transition-all"
     style={{
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      border: "1px solid #e5e5e5",
      backgroundColor: checked ? "#59427B" : "white",
      padding: "12px"
     }}
     onClick={() => onChange(!checked)}
    >
     {checked && (
      <svg
       width="16"
       height="16"
       viewBox="0 0 16 16"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
      >
       <path
        d="M13.3334 4L6.00002 11.3333L2.66669 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
       />
      </svg>
     )}
    </div>
    <span className="text-[18px]" style={{ color: "#373737" }}>
     {label}
    </span>
   </label>
  </div>
 );
}
