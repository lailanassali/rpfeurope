"use client";

import { useState } from "react";
import { FormInput } from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";
import { FormTextarea } from "@/components/common/FormTextarea";
import { ChhButton } from "@/components/common/ChhButton";
import { ImageCarousel } from "@/components/common/ImageCarousel";

const carouselImages = [
 "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&h=800&fit=crop",
 "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop",
 "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&h=800&fit=crop",
 "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=1200&h=800&fit=crop"
];

export default function GiveLifePage() {
 const [attendsBranch, setAttendsBranch] = useState("");

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Form submitted");
 };

 return (
  <div className="flex min-h-screen flex-col">
   <main className="flex-1">
    {/* Header Section */}
    <section className="py-24 bg-white">
     <div className="container w-11/12 px-4 mx-auto text-left">
      <h1 className="text-[40px] font-bold text-black mb-6">
       Give Your Life to Christ
      </h1>

      <p className="text-[20px] text-black/70 mb-6">
       Whether you are a new believer or rededicating your life, we are so excited that you are ready to take this next step!
      </p>

      <p className="text-[20px] text-black/70 mb-6">
       Say "yes" to Jesus by filling out the form below and one of our team will connect with you, celebrate with you, and help you navigate your new life in Christ.
      </p>

      <div className="text-[#59427B] text-[24px] mt-10 text-center">
       "The effective, fervent prayer of a righteous man avails much. — James 5:16"
      </div>
     </div>
    </section>

    {/* Form Section */}
    <section className="py-24">
     <div className="container w-11/12 px-4 mx-auto">
      <div className="max-w-[50%] mx-auto px-[48px] py-8 rounded-[16px] border border-[#e5e5e5]/50">
       <div className="">
        <h2 className="text-[24px] font-semibold text-[#211F1F] mb-10 text-center">
         I want to give my life to Christ
        </h2>

        <form onSubmit={handleSubmit}>
         <FormInput label="Full Name" type="text" required />
         <FormInput label="Email" type="email" required />
         <FormInput label="Phone Number" type="tel" required />
         <FormInput label="Age" type="number" required />

         <FormSelect
          label="Are you rededicating your life to Christ?"
          options={[
           { value: "yes", label: "Yes" },
           { value: "no", label: "No" }
          ]}
          required
         />

         <FormSelect
          label="Do you attend a branch?"
          options={[
           { value: "yes", label: "Yes" },
           { value: "no", label: "No" }
          ]}
          onChange={(e) => setAttendsBranch(e.target.value)}
          required
         />

         {attendsBranch === "yes" && (
          <FormInput label="Specify Branch" type="text" required />
         )}

         <FormTextarea
          label="Anything you would like to share (Optional)"
         />

         <ChhButton
          type="submit"
          className="w-full bg-primary text-white hover:bg-primary/90 h-[57px] rounded-[12px] mt-5"
         >
          Start my journey
         </ChhButton>
        </form>
       </div>
      </div>
     </div>
    </section>

    {/* Image Carousel Section */}
    <section className="py-24">
     <div className="mx-auto">
      <ImageCarousel
       images={carouselImages}
       height={360}
       layout="multi"
       showIndicators={false}
      />
     </div>
    </section>
   </main>
  </div>
 );
}
