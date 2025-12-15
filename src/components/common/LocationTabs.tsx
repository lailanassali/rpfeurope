"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { ServiceLocationCard } from "@/components/common/ServiceLocationCard";
import { useDebounce } from "@/hooks/useDebounce";

interface Location {
  slug: string;
  title: string;
  services: string[];  // Changed from serviceType and date to services array
  address: string;
  image: string;
  mapLink: string;
}

interface LocationTab {
  id: string;
  name: string;
  locations: Location[];
}

interface LocationTabsProps {
  tabs: LocationTab[];
}

export function LocationTabs({ tabs }: LocationTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Search across all tabs and switch to matching tab
  const filteredLocationsWithTab = useMemo(() => {
    if (!debouncedSearch) {
      const currentTab = tabs.find(tab => tab.id === activeTab);
      return {
        tabId: activeTab,
        locations: currentTab?.locations || []
      };
    }

    // Search across all tabs
    for (const tab of tabs) {
      const matchingLocations = tab.locations.filter(location =>
        location.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        location.address.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

      if (matchingLocations.length > 0) {
        // Auto-switch to the tab with matching results
        if (tab.id !== activeTab) {
          setActiveTab(tab.id);
        }
        return {
          tabId: tab.id,
          locations: matchingLocations
        };
      }
    }

    return {
      tabId: activeTab,
      locations: []
    };
  }, [debouncedSearch, activeTab, tabs]);

  return (
    <div className="w-full">
      {/* Tab Navigation and Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        {/* Tabs */}
        <div className="flex gap-3 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-[10px] h-[44px] w-[160px] rounded-[8px] transition-colors ${activeTab === tab.id
                ? "bg-primary text-white font-bold"
                : "bg-transparent text-black hover:bg-gray-100"
                }`}
              style={{
                border: activeTab === tab.id ? 'none' : '0.5px solid rgba(229, 229, 229, 0.5)'
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Active Location Heading */}
      <h2 className="text-[40px] font-semibold text-black mt-[98px] mb-[46px]">
        {tabs.find(tab => tab.id === filteredLocationsWithTab.tabId)?.name || ""} Branches
      </h2>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocationsWithTab.locations.length > 0 ? (
          filteredLocationsWithTab.locations.map((location) => (
            <ServiceLocationCard
              key={location.slug}
              slug={location.slug}
              image={location.image}
              title={location.title}
              services={location.services}
              address={location.address}
              mapLink={location.mapLink}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No locations found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
