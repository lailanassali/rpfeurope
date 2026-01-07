"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { ChhButton } from "../common/ChhButton";
import { FormInput } from "../common/FormInput";
import { FormSelect } from "../common/FormSelect";
import { FormTextarea } from "../common/FormTextarea";

export function GiveLifeForm() {
 const [isLoading, setIsLoading] = useState(false);
 const [attendBranch, setAttendBranch] = useState("no");

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
   data[key] = value;
  });

  try {
   const res = await fetch("/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     form_type: "give_life",
     data: data,
    }),
   });

   if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || "Submission failed");
   }

   toast.success("Thank you for your decision! We will be in touch shortly.");
   (e.target as HTMLFormElement).reset();
   setAttendBranch("no");
  } catch (error: any) {
   console.error("Submission Error:", error);
   toast.error(error.message || "Something went wrong. Please try again.");
  } finally {
   setIsLoading(false);
  }
 }

 return (
  <div className="lg:w-1/2 md:px-[48px] py-8 rounded-[16px] md:border border-[#e5e5e5]/50 mx-auto overflow-hidden">
   <div className="">
    <h3 className="md:text-[24px] text-[20px] font-semibold text-[#211F1F] mt-6 mb-8 text-center">
     I want to give my life to christ
    </h3>

    <form onSubmit={handleSubmit}>
     <FormInput name="fullName" label="Full Name" type="text" required />
     <FormInput name="email" label="Email" type="email" required />

     <FormInput name="phone" label="Phone Number" type="tel" required />
     <FormInput name="age" label="Age" type="number" required />

     <FormSelect
      name="decisionType"
      label="Are you rededicating or newly giving your life to Christ?"
      options={[
       { value: "Rededicating", label: "Rededicating" },
       { value: "Newly giving my life to Christ", label: "Newly giving my life to Christ" }
      ]}
      required
     />

     <FormSelect
      name="attendBranch"
      label="Do you attend a branch?"
      options={[
       { value: "yes", label: "Yes" },
       { value: "no", label: "No" }
      ]}
      onChange={(e) => setAttendBranch(e.target.value)}
      required
     />

     {attendBranch === "yes" && (
      <FormInput name="branchName" label="Name of Branch" type="text" required />
     )}

     <FormTextarea
      name="message"
      label="Anything you would like to share (optional)"
     />

     <ChhButton
      type="submit"
      disabled={isLoading}
      className="w-full bg-primary text-white hover:bg-primary/90 h-[57px] rounded-[12px] mt-5"
     >
      {isLoading ? "Submitting..." : "Start my journey"}
     </ChhButton>
    </form>
   </div>
  </div>
 );
}
