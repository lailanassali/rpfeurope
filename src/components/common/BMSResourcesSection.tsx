"use client";

import { useState, useEffect } from "react";
import { CardComponent } from "@/components/common/CardComponent";

export function BMSResourcesSection() {
 const [resources, setResources] = useState<any[]>([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  fetchResources();
 }, []);

 async function fetchResources() {
  try {
   const res = await fetch('/api/resources?limit=3');
   if (!res.ok) throw new Error();
   const data = await res.json();
   setResources(data);
  } catch (error) {
   console.error('Failed to fetch resources:', error);
  } finally {
   setIsLoading(false);
  }
 }

 if (isLoading) {
  return (
   <div className="flex justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
   </div>
  );
 }

 if (resources.length === 0) {
  return (
   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Fallback content if no resources */}
    <CardComponent
     image="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop"
     title="BMS Day"
     linkText="Join Live Stream"
     linkHref="https://youtube.com/@chheurope"
     description="Command your morning! Join us live Monday – Friday, 7:00–8:00 AM."
     textBgColor="#ffffff"
    />
    <CardComponent
     image="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop"
     title="BMS Night"
     linkText="Join Live Stream"
     linkHref="https://youtube.com/@chheurope"
     description="End your day in His presence. Monday – Thursday, 11:00 PM–12:00 AM."
     textBgColor="#ffffff"
     badge={{ title: "Live", bgColor: "#10B981", textColor: "#FFFFFF" }}
    />
    <CardComponent
     image="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop"
     title="Daily Devotional"
     linkText="Explore Volumes"
     linkHref="/resources"
     description="A 365-Day Journey of Faith and Renewal."
     textBgColor="#ffffff"
    />
   </div>
  );
 }

 return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
   {resources.map((resource) => (
    <CardComponent
     key={resource.id}
     image={resource.image_url || "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop"}
     title={resource.title}
     linkText={resource.link_text || "Learn More"}
     linkHref={resource.link_url || "/resources"}
     description={resource.description}
     textBgColor="#ffffff"
     badge={resource.badge_text ? {
      title: resource.badge_text,
      bgColor: "#10B981",
      textColor: "#FFFFFF"
     } : undefined}
    />
   ))}
  </div>
 );
}
