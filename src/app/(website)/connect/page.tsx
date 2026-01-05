"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import { ConnectTabs } from "@/components/common/ConnectTabs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { TestimonialCarousel } from "@/components/common/TestimonialCarousel";


import { CONNECT_TABS_DATA } from "@/lib/connect-data";
// Separate component that uses useSearchParams
function ConnectPageContent() {
   const searchParams = useSearchParams();
   const [activeTab, setActiveTab] = useState("baptism");
   const [connectImages, setConnectImages] = useState<Record<string, string>>({});



   useEffect(() => {
      const tabParam = searchParams.get("tab");
      if (tabParam) {
         // Check if the tab parameter matches any connectTab id
         const matchingTab = connectTabs.find(tab => tab.id === tabParam);
         if (matchingTab) {
            setActiveTab(tabParam);
         }
      }

      // Fetch connect tab images
      fetchConnectImages();
   }, [searchParams]);

   async function fetchConnectImages() {
      try {
         const imageMap: Record<string, string> = {};
         const tabIds = ['baptism', 'counselling', 'mentorship', 'serve', 'testimonies', 'prayer'];

         await Promise.all(tabIds.map(async (tabId) => {
            const res = await fetch(`/api/admin/images?page=connect_${tabId}`);
            if (res.ok) {
               const images = await res.json();
               if (images.length > 0) {
                  imageMap[tabId] = images[0].image_url;
               }
            }
         }));

         setConnectImages(imageMap);
      } catch (error) {
         console.error('Failed to fetch connect images:', error);
      }
   }

   const connectTabs = CONNECT_TABS_DATA.map(tab => ({
      ...tab,
      image: connectImages[tab.id] || ""
   }));

   return (
      <div className="flex min-h-screen flex-col">
         <main className="flex-1">
            {/* Header Section */}
            <section className="md:py-24 py-8 bg-white">
               <div className="container w-11/12 px-4 mx-auto text-left">
                  <h1 className="md:text-[40px] text-[24px] font-bold text-black mb-6 text-left">
                     We're Here For You - Get Connected. Grow Together.
                  </h1>
                  <p className="md:text-[20px] text-[16px] text-black/70 text-left w-11/12">
                     Whether you're taking your next step of faith, seeking guidance, or looking to serve — there's a place for you here at RPF. Choose an area below and start your journey.
                  </p>
               </div>
            </section>

            {/* Connect Tabs Section */}
            <section className="md:pt-24 md:pb-40 pt-5 pb-5 bg-white">
               <div className="container w-11/12 px-4 mx-auto">
                  <ConnectTabs tabs={connectTabs} setActiveTab={setActiveTab} activeTab={activeTab} />
               </div>
            </section>

            {/* Conditional FAQ or Testimonials Section */}
            {activeTab === "testimonies" ? (
               <TestimonialCarousel />
            ) : (
               <section className="md:py-24 py-16 bg-[#CEC3DF4D]">
                  <div className="container md:w-11/12 w-full mx-auto md:px-[56px] px-4">
                     <div className="text-center mb-8">
                        <h2 className="md:text-[40px] text-xl font-bold text-black mb-4">
                           Frequently Asked Questions
                        </h2>
                        <p className="md:text-[18px] text-[14px] text-black">
                           Got questions? We've got answers!
                        </p>
                     </div>
                     <FAQAccordion category={
                        activeTab === 'baptism' ? 'Baptism' :
                           activeTab === 'counselling' ? 'Counselling' :
                              activeTab === 'prayer' ? 'Prayers' :
                                 activeTab === 'serve' ? 'Serve' :
                                    activeTab === 'mentorship' ? 'Mentorship' :
                                       'General'
                     } />
                  </div>
               </section>
            )}
         </main>
         <Toaster position="top-right" />
      </div>
   );
}

export default function ConnectPage() {
   return (
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
         <ConnectPageContent />
      </Suspense>
   );
}
