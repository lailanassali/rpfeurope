import { Metadata } from "next";
import { SectionContent } from "@/components/common/SectionContent";
import { BMSCard } from "@/components/common/BMSCard";
import { DevotionalCard } from "@/components/common/DevotionalCard";
import { FinalCTA } from "@/components/common/FinalCTA";

export const metadata: Metadata = {
 title: "Resources | CHH Europe",
 description: "Explore teachings and study materials from Christ Healing Home Europe.",
};

export default function ResourcesPage() {
 return (
  <div className="flex min-h-screen flex-col">
   <main className="flex-1">
    {/* Top Heading Section */}
    <section className="py-[65px]">
     <div className="container w-11/12 mx-auto px-4 text-center">
      <SectionContent
       heading="CHH Resources"
       description="Explore teachings and study materials designed to help you grow strong in faith and live by God's Word."
       alignment="center"
       headingSize="medium"
      />
     </div>
    </section>

    {/* BMS Live Stream Section */}
    <section className="bg-[#E7E1EF] py-[100px]">
     <div className="container w-11/12 mx-auto px-4">
      <SectionContent
       heading="The Bright & Morning Star Live Stream"
       description={`There's no better way to start and end your day than in His presence!\n\nJoin us live as we pray, read and dive into God's Word together — with moments of prophetic insight, dream interpretation and divine revelation that will set your spirit on fire. We've watched God move powerfully in every session — healing hearts, answering prayers and transforming lives all over the globe. From every nation and every time zone, people are tuning in to seek the Lord - and you're invited.`}
       alignment="left"
       headingSize="small"
       className="mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <BMSCard
        title="BMS Day"
        description="It's time to command your morning!"
        schedule="Monday – Friday, 7:00–8:00 AM"
        image="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop"
        linkText="Join Live Stream"
        linkHref="https://youtube.com/@chheurope"
       />

       <BMSCard
        title="BMS Night"
        description="There's no better way to end your day in His presence."
        schedule="Monday – Thursday, 11:00 PM–12:00 AM"
        image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop"
        badge={{
         text: "Upcoming",
         bgColor: "white",
         textColor: "#A25F20",
         borderColor: "#A25F20"
        }}
       />
      </div>
     </div>
    </section>

    {/* Daily Devotional Section */}
    <section className="py-[146px]">
     <div className="container w-11/12 mx-auto px-4">
      <SectionContent
       heading="The Bright & Morning Star Daily Devotional"
       description={`A 365-Day Journey of Faith and Renewal\n\nThe Bright & Morning Star invites you on a transformative journey with God. This 365-day devotional is written to walk with you through every season of life. Each page gently guides you deeper into intimacy with God, helping you experience His love in a fresh, powerful way.\n\nFind strength for today and hope for tomorrow — one day at a time.`}
       alignment="left"
       headingSize="small"
       className="mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <DevotionalCard
        volume="Volume 1"
        title="Rooted in Grace"
        author="By Pastor Sarah Adeyemi"
        description="Growing strong in the love that anchors us. Discover the unshakable foundation of God's grace and learn to live in His love daily."
        buttonText="Buy on Amazon"
        buttonHref="https://amazon.com"
        image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
       />

       <DevotionalCard
        volume="Volume 2"
        title="Light for the Journey"
        author="By Pastor Augustine E-Ben"
        description="A collection of reflections to help you navigate each day with clarity, peace, and faith."
        buttonText="Buy on Amazon"
        buttonHref="https://amazon.com"
        image="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
       />

       <DevotionalCard
        volume="Volume 3"
        title="Strength for Today"
        author="By CHH Teaching Team"
        description="Courage and comfort for every season. This volume guides you through Scripture that builds resilience, hope, and spiritual strength."
        buttonText="Buy on Amazon"
        buttonHref="https://amazon.com"
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
       />

       <DevotionalCard
        volume="Volume 4"
        title="Whispers of the Spirit"
        author="By Pastor Anita James"
        description="Hearing God's voice in everyday life. Daily devotional teaching you to listen and respond to the Holy Spirit's gentle leading."
        buttonText="Buy on Amazon"
        buttonHref="https://amazon.com"
        image="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop"
       />

       <DevotionalCard
        volume="Volume 5"
        title="The Peace Within"
        author="By Pastor Michael Efe"
        description="Choosing calm and trust in the middle of chaos. Learn to rest in God's presence and experience His peace in every circumstance."
        buttonText="Buy on Amazon"
        buttonHref="https://amazon.com"
        image="https://images.unsplash.com/photo-1472173148041-00294f0814a2?w=300&h=400&fit=crop"
       />
      </div>
     </div>
    </section>

    {/* Final CTA with Custom Text */}
    <FinalCTA
     heading="Stay Connected and Grow With Us"
     subtitle="Faith grows best in community. Whether you're near one of our branches or joining online, there are many ways to stay connected and be part of what God is doing through RPF Europe."
     primaryButtonText="Join Our Ministry"
     primaryButtonHref="/connect"
     backgroundImage="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&h=1080&fit=crop"
    />
   </main>
  </div>
 );
}
