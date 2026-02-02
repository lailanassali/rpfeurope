"use client";

import { useState, useEffect } from 'react';

export default function PrivacyPolicyPage() {
 const [content, setContent] = useState<string>('');
 const [lastUpdated, setLastUpdated] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  fetchPrivacyPolicy();
 }, []);

 async function fetchPrivacyPolicy() {
  try {
   const res = await fetch('/api/privacy-policy');
   if (!res.ok) throw new Error();
   const data = await res.json();

   // If no content in database, use default static content
   if (!data.content) {
    setContent(getDefaultContent());
   } else {
    setContent(data.content);
   }
   setLastUpdated(data.last_updated);
  } catch (error) {
   console.error('Failed to fetch privacy policy:', error);
   // Fallback to default content on error
   setContent(getDefaultContent());
  } finally {
   setIsLoading(false);
  }
 }

 if (isLoading) {
  return (
   <div className="flex min-h-screen items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
   </div>
  );
 }

 return (
  <div className="flex min-h-screen flex-col">
   <main className="flex-1">
    {/* Header Section */}
    <section className="py-[65px] bg-white">
     <div className="container w-11/12 mx-auto px-4">
      <h1 className="text-[48px] font-bold text-black mb-6">Privacy Policy</h1>
      {lastUpdated && (
       <p className="text-[18px] text-[#373737]">
        <strong>Last Updated:</strong> {new Date(lastUpdated).toLocaleDateString('en-GB', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
        })}
       </p>
      )}
     </div>
    </section>

    {/* Dynamic Content */}
    <div
     className="privacy-policy-content"
     dangerouslySetInnerHTML={{ __html: content }}
    />
   </main>
  </div>
 );
}

// Default static content as fallback
function getDefaultContent() {
 return `
    <section class="py-24 bg-[#CEC3DF33]">
      <div class="container w-11/12 mx-auto px-4">
        <div class="max-w-4xl">
          <p class="text-[18px] text-[#373737] leading-relaxed mb-6">
            At Redeemed Pillar of Fire Europe ("RPF," "we," "us," or "our"), we are committed to protecting your privacy and handling your personal information with care and respect. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, attend our services, or engage with our ministries.
          </p>
          <p class="text-[18px] text-[#373737] leading-relaxed">
            By using our website or services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>
      </div>
    </section>
  `;
}
