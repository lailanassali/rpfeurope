"use client";

import { useState, useEffect } from "react";
import { SectionContent } from "@/components/common/SectionContent";
import { BMSCard } from "@/components/common/BMSCard";
import { DevotionalCard } from "@/components/common/DevotionalCard";
import { FinalCTA } from "@/components/common/FinalCTA";
import { getContrastColor } from "@/lib/color-utils";

// Note: This is a client component due to useState/useEffect for resources
// CTA image will need to be fetched client-side or passed as prop
export default function ResourcesPage() {
  const [bmsResources, setBmsResources] = useState<any[]>([]);
  const [devotionals, setDevotionals] = useState<any[]>([]);
  const [ctaImage, setCtaImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResources();
    fetchCTAImage();
  }, []);

  async function fetchCTAImage() {
    try {
      const res = await fetch('/api/admin/images?page=resources_cta');
      if (res.ok) {
        const images = await res.json();
        if (images.length > 0) {
          setCtaImage(images[0].image_url);
        }
      }
    } catch (error) {
      console.error('Failed to fetch CTA image:', error);
    }
  }

  async function fetchResources() {
    try {
      const res = await fetch('/api/resources');
      if (!res.ok) throw new Error();
      const data = await res.json();

      // Filter resources by category
      setBmsResources(data.filter((r: any) => r.category === 'bms_stream'));
      setDevotionals(data.filter((r: any) => r.category === 'devotional'));
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setIsLoading(false);
    }
  }

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

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : bmsResources.length === 0 ? (
              <div className="text-center text-gray-500 py-12">No BMS streams available</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bmsResources.map((resource) => (
                  <BMSCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    schedule={resource.schedule}
                    image={resource.image_url || "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop"}
                    linkText={resource.link_text}
                    linkHref={resource.link_url}
                    badge={resource.badge_text ? {
                      text: resource.badge_text,
                      bgColor: resource.badge_color || "#10B981",
                      textColor: getContrastColor(resource.badge_color || "#10B981"), borderColor: getContrastColor(resource.badge_color || "#10B981")
                    } : undefined}
                  />
                ))}
              </div>
            )}
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

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : devotionals.length === 0 ? (
              <div className="text-center text-gray-500 py-12">No devotionals available</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {devotionals.map((devotional) => (
                  <DevotionalCard
                    key={devotional.id}
                    volume={devotional.volume || "Volume"}
                    title={devotional.title}
                    author={devotional.author || "By CHH Teaching Team"}
                    description={devotional.description}
                    buttonText={devotional.link_text}
                    buttonHref={devotional.link_url}
                    image={devotional.image_url}
                    badge={devotional.badge_text ? {
                      text: devotional.badge_text,
                      bgColor: devotional.badge_color || "#10B981",
                      textColor: getContrastColor(devotional.badge_color || "#10B981"),
                      borderColor: getContrastColor(devotional.badge_color || "#10B981")
                    } : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Final CTA with Custom Text */}
        <FinalCTA
          heading="Stay Connected and Grow With Us"
          subtitle="Faith grows best in community. Whether you're near one of our branches or joining online, there are many ways to stay connected and be part of what God is doing through RPF Europe."
          primaryButtonText="Join Our Ministry"
          primaryButtonHref="/connect"
          backgroundImage={ctaImage}
        />
      </main>
    </div>
  );
}
