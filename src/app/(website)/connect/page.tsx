"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import { ConnectTabs } from "@/components/common/ConnectTabs";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { TestimonialCarousel } from "@/components/common/TestimonialCarousel";


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

   const connectTabs = [
      {
         id: "baptism",
         name: "Baptism",
         title: "Baptism",
         description: [
            "Baptism is a beautiful declaration of your faith in Jesus Christ. It's a public testimony that you have accepted Christ as your Lord and Savior and are committed to following Him.",
            "At CHH, we believe baptism is an important step in your spiritual journey. Our baptism classes will help you understand the significance of this sacred act and prepare you for this special moment.",
            "Whether you're new to faith or have been walking with Christ for years, we welcome you to take this step and celebrate with our church family."
         ],
         quote: ["Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit. - Matthew 28:19"],
         image: connectImages.baptism || "",
         formTitle: "Get Baptized",
         formDescription: "Fill out this form to begin your baptism journey with us.",
         formFields: ["fullName", "email", "phone", "gender", "age", "attendsBranch", "baptismClasses", "preferredContact", "why"],
         submitText: "I'm ready to get baptized"
      },
      {
         id: "counselling",
         name: "Counselling",
         title: "Support & Counselling",
         description: [
            "Hearing and recognising the voice of God is not always easy, but we were never called to walk this journey alone. Through the guidance of the Holy Spirit, God has given the body of Christ the gift of building one another up in faith, hope and love",
            "That is why we offer free counselling and support sessions for anyone in need of encouragement, guidance or prayer. Each session is a safe space where you can receive Spiritled counsel, prophetic word and dedicated time in prayer. ",
            "We believe in supporting one another in our emotional, spiritual and relational journeys. Simply book your session below — we would be honoured to stand with you."
         ],
         quote: ["Our heart is to walk alongside you and help you hear God's voice more clearly.", "In the multitude of counsel there is safety- Proverbs 11: 14"],
         image: connectImages.counselling || "",
         formTitle: "I'd like to Request Counselling",
         formDescription: "If you would like confidential guidance, pastoral care or just someone to listen, please complete the form below. A member of the team will reach out to you as soon as possible.",
         formFields: ["fullName", "email", "phone", "preferredContact", "counsellingType", "urgencyLevel", "message", "additionalNotes"],
         submitText: "Request Counselling"
      },
      {
         id: "mentorship",
         name: "Mentorship",
         title: "Join a Mentorship Group",
         description: [
            "We weren't created to walk this journey alone. Our mentorship groups connect you with a trusted leader who will walk alongside you—encouraging you to grow in fellowship, in the Word, in prayer and in your purpose",
            "Fellowship with others is an important part of a Christian's journey. God created us for a community to live life together, encourage one another, grow in faith, and serve our world. Small groups are a place to go deeper, build relationships and experience life in Christ. "
         ],
         quote: ["Do not forsake the gathering of the Saints – Hebrews 10:25", "As iron sharpens iron, so one person sharpens another - Proverbs 27:17"],
         image: connectImages.mentorship || "",
         formTitle: "I Want to Join a Group",
         formDescription: "Grow in Faith Together.  Our heart is to walk alongside you and help you hear God's voice more clearly.  Let us know a few details and we will help find a group that fits you. ",
         formFields: ["fullName", "email", "phone", "hasMentorshipGroup", "preferredContact", "message", "additionalNotes"],
         submitText: "Find My Group"
      },
      {
         id: "serve",
         name: "Serve",
         title: "Serve in a Department",
         description: [
            "God has placed divine gifts and abilities within each of us—not for ourselves alone, but for the edifying of the body of Christ. Every part matters, and every act of service plays a role in advancing the Kingdom.",
            "Whether it's the choir, media or children's ministry—there's a place for you here to grow and serve. When we each use our gifts and heart to serve, the church grows stronger, and we bring hope to our world"
         ],
         quote: ["Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms. – 1 Peter 4: 10 - 11"],
         image: connectImages.serve || "",
         formTitle: "I Want to Serve",
         formDescription: "We are glad that you are wanting to step into serving. . Please complete the form and we will help you find the right place to serve. ",
         formFields: ["fullName", "email", "phone", "newToChurch", "areasOfInterest", "skillsExperience", "preferredContact", "additionalNotes"],
         submitText: "Let's Serve Together"
      },
      {
         id: "testimonies",
         name: "Testimonies",
         title: "Testimonies",
         description: [
            "The book of Revelation tells us:",
            "They overcame him by the blood of the Lamb and by the word of their testimony. — Revelation 12: 11",
            "Your story could be the spark that ignites someone else's faith. Whether  you have recently given your life to Christ, rededicated your heart to him, or experienced His goodness in a specific way, it could be healing, restoration, transformation, deliverance, or we would love to hear your testimony — every testimony glorifies Jesus and encourages others to believe for their own breakthrough."
         ],
         quote: ["Let the redeemed of the Lord say so, Whom He has redeemed from the hand of the enemy — Psalm 107: 2"],
         image: connectImages.testimonies || "",
         formTitle: "What Has God Done For You?",
         formDescription: "By sharing what God has done in your life, you not only glorify Him but also encourage others to believe that He can do it again. Please take a moment to complete the form below",
         formFields: ["fullName", "email", "phone", "testimonyCategory", "sharePublicly", "testimony", "preferredContact"],
         submitText: "Share My Testimony"
      },
      {
         id: "prayer",
         name: "Prayer Request",
         title: "Prayer Requests",
         description: [
            "This is a House of Prayer",
            "At Christ Healing Home (CHH), we believe in the power of intercession. Time and time again, we've witnessed divine miracl —healing, deliverance, provision and restoration. We believe the power of God is available to turn around any situation.",
            "Whether you're seeking healing, breakthrough, or peace in a difficult season, know this: God is near, and He listens. Our prayer team is ready to stand in faith with you and intercede on your behalf."
         ],
         quote: ["The prayer of a righteous person is powerful and effective. - James 5:16"],
         image: connectImages.prayer || "",
         formTitle: "I'd Like to Request Prayer",
         formDescription: "Prayer is powerful. Our team would love to stand with you and cover your need in prayer. Please share as much or as little as you feel comfortable and we will lift you before God. All requests treated with confidentiality and care.",
         formFields: ["fullName", "email", "phone", "prayerRequest", "prayWithYou", "preferredContact"],
         submitText: "Submit My Prayer Request"
      }
   ];

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
            <section className="md:pt-24 md:pb-40 pt-5 pb-5 bg-gray-50">
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
