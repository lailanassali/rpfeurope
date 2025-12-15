"use client";

import { useState, useMemo, useEffect } from "react";
import { HeroText } from "@/components/common/HeroText";
import { EventCard } from "@/components/common/EventCard";
import { FinalCTA } from "@/components/common/FinalCTA";

interface Event {
  slug: string;
  image_url?: string;
  title: string;
  category: string;
  location: string;
  date: string;
  time: string;
  venue: string;
}

const categories = ["All", "CHH Europe", "Youth", "Children", "Men", "Women", "Campus"];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [events, setEvents] = useState<Event[]>([]);
  const [locations, setLocations] = useState<string[]>(["All Locations"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEvents(data);

      // Extract unique locations
      const uniqueLocations = Array.from(new Set(data.map((e: Event) => e.location)));
      setLocations(["All Locations", ...uniqueLocations as any]);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const categoryMatch = activeCategory === "All" || event.category === activeCategory;
      const locationMatch = selectedLocation === "All Locations" || event.location === selectedLocation;
      return categoryMatch && locationMatch;
    });
  }, [events, activeCategory, selectedLocation]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[650px] w-full flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundColor: "#382a4dff",
              backgroundImage: "linear-gradient(rgba(89, 66, 123, 0.6), rgba(89, 66, 123, 0.6)), url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&h=1080&fit=crop')"
            }}
          />
          <HeroText
            heading="Upcoming Events at CHH"
            subtitle="Discover events that bring faith, purpose & community together"
          />
        </section>

        {/* Events Section */}
        <section className="py-24 bg-white">
          <div className="container w-11/12 px-4 mx-auto">
            <h2 className="text-[40px] font-bold text-black mb-12">Upcoming events at CHH</h2>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12">
              {/* Category Tabs */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-transparent text-black hover:bg-gray-100"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Location Filter */}
              <div className="w-full md:w-auto md:min-w-[250px]">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-[50px] px-4 text-[14px] border border-[#dde6f0] rounded-[8px] outline-none focus:ring-2 focus:ring-primary transition-all bg-white"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Event Cards Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event.slug}
                      slug={event.slug}
                      image={event.image_url}
                      title={event.title}
                      category={event.category}
                      date={event.date}
                      time={event.time}
                      venue={event.venue}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    No events found matching your filters.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA
          heading="Stay Updated With Upcoming Events"
          subtitle="Subscribe to our calendar to receive updates about upcoming events and never miss an opportunity to connect."
          primaryButtonText="Subscribe to Calendar"
          primaryButtonHref="#"
        />
      </main>
    </div>
  );
}
