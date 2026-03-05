"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, X } from "lucide-react";
import { ServiceLocationCard } from "@/components/common/ServiceLocationCard";
import { useDebounce } from "@/hooks/useDebounce";

interface Location {
  slug: string;
  title: string;
  services: string[];
  address: string;
  howToFindUs: string;
  image: string;
  mapLink: string;
  latitude?: number | null;
  longitude?: number | null;
  distance?: number;
}

interface LocationTab {
  id: string;
  name: string;
  locations: Location[];
}

interface LocationTabsProps {
  tabs: LocationTab[];
}

// Helper to calculate distance
function calculateDistanceInMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

export function LocationTabs({ tabs }: LocationTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [postcodeQuery, setPostcodeQuery] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [nearestLocations, setNearestLocations] = useState<Location[] | null>(null);
  const [postcodeError, setPostcodeError] = useState("");

  const handlePostcodeSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!postcodeQuery.trim()) {
      setNearestLocations(null);
      setPostcodeError("");
      return;
    }

    setIsGeocoding(true);
    setPostcodeError("");
    setNearestLocations(null);
    setSearchQuery(""); // Clear text search when doing location search

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(postcodeQuery)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const userLat = parseFloat(lat);
        const userLon = parseFloat(lon);

        // Flatten all locations across all tabs
        const allLocations = tabs.flatMap(tab => tab.locations);

        // Calculate distances for locations that have coordinates
        const locationsWithDistance = allLocations.map(loc => {
          if (loc.latitude && loc.longitude) {
            const distance = calculateDistanceInMiles(userLat, userLon, loc.latitude, loc.longitude);
            return { ...loc, distance };
          }
          return { ...loc, distance: Infinity };
        });

        // Filter valid distances, sort, and take top 3
        const sorted = locationsWithDistance
          .filter(loc => loc.distance !== Infinity)
          .sort((a, b) => (a.distance || 0) - (b.distance || 0))
          .slice(0, 3);

        if (sorted.length > 0) {
          setNearestLocations(sorted);
        } else {
          setPostcodeError("No locations found with valid coordinates.");
        }
      } else {
        setPostcodeError("Could not find coordinates for this postcode/address.");
      }
    } catch (err) {
      setPostcodeError("Failed to search location. Please try again.");
    } finally {
      setIsGeocoding(false);
    }
  };

  const clearPostcodeSearch = () => {
    setPostcodeQuery("");
    setNearestLocations(null);
    setPostcodeError("");
  };

  // Regular text search
  const filteredTabContent = useMemo(() => {
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

  const displayLocations = nearestLocations || filteredTabContent.locations;
  const currentTabName = nearestLocations
    ? `3 Closest Locations to "${postcodeQuery}"`
    : (tabs.find(tab => tab.id === filteredTabContent.tabId)?.name ? `${tabs.find(tab => tab.id === filteredTabContent.tabId)?.name} Branches` : "Branches");

  return (
    <div className="w-full">
      {/* Top Controls Container */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 md:mb-8 mb-4">

        {/* Tab Navigation */}
        <div className="flex md:gap-3 gap-1 flex-nowrap md:flex-wrap overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full xl:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                clearPostcodeSearch();
              }}
              className={`px-[10px] h-[44px] shrink-0 md:min-w-[160px] rounded-[8px] transition-colors ${activeTab === tab.id && !nearestLocations
                ? "bg-primary text-white font-bold"
                : "bg-transparent text-black hover:bg-gray-100"
                }`}
              style={{
                border: activeTab === tab.id && !nearestLocations ? 'none' : '0.5px solid rgba(229, 229, 229, 0.5)'
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search Inputs */}
        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
          {/* Text Search */}
          <div className="relative w-full md:w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (nearestLocations) clearPostcodeSearch();
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white h-[44px]"
            />
          </div>

          {/* Postcode Search */}
          <form onSubmit={handlePostcodeSearch} className="relative w-full md:w-[300px] flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter postcode..."
                value={postcodeQuery}
                onChange={(e) => setPostcodeQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white h-[44px]"
              />
              {postcodeQuery && (
                <button
                  type="button"
                  onClick={clearPostcodeSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isGeocoding || !postcodeQuery.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed h-[44px] transition-colors whitespace-nowrap"
            >
              {isGeocoding ? "Finding..." : "Find"}
            </button>
          </form>
        </div>
      </div>

      {postcodeError && (
        <p className="text-red-500 text-sm mb-4">{postcodeError}</p>
      )}

      {/* Active Location Heading */}
      <h2 className="md:text-[40px] text-xl font-semibold text-black md:mt-[60px] mt-8 md:mb-[46px] mb-6">
        {currentTabName}
      </h2>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isGeocoding ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-500 font-medium">Finding the closest RPF branches...</p>
          </div>
        ) : displayLocations.length > 0 ? (
          displayLocations.map((location) => (
            <ServiceLocationCard
              key={location.slug}
              slug={location.slug}
              image={location.image}
              title={location.title}
              services={location.services}
              address={location.address}
              mapLink={location.mapLink}
              howToFindUs={location.howToFindUs}
              distance={location.distance}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No locations found. {nearestLocations && "Try another postcode."}
          </div>
        )}
      </div>
    </div>
  );
}
