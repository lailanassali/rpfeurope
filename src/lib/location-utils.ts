
import { supabaseAdmin } from './supabase';

export interface Location {
  id: string;
  name: string;
  slug: string;
  tag: string;
  image_url: string;
  address: string;
  services: string;
  map_link: string;
  whatsapp_link: string;
  contact: string;
  welcome_heading: string;
  welcome_description: string;
  welcome_quote: string;
  address_image_url: string;
  carousel_images: string[];
  how_to_find_us: string;
}

export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

export function parseServices(servicesStr: string | null): string[] {
  if (!servicesStr) return [];
  return servicesStr
    .split('|')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

export async function getLocationsByTag(tag: string, limit?: number): Promise<Location[]> {
  try {
    let query = supabaseAdmin
      .from('locations')
      .select('*')
      .eq('tag', tag)
      .order('name', { ascending: true });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching locations for tag ${tag}:`, error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error(`Error fetching locations for tag ${tag}:`, error);
    return [];
  }
}

export async function getLocationsByTags(tags: string[]): Promise<Location[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('locations')
      .select('*')
      .in('tag', tags)
      .order('name', { ascending: true });

    if (error) {
      console.error(`Error fetching locations for tags ${tags}:`, error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error(`Error fetching locations for tags ${tags}:`, error);
    return [];
  }
}

export async function getAllLocations(): Promise<Location[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('locations')
      .select('*')
      .order('tag', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching all locations:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching all locations:', error);
    return [];
  }
}

export function transformLocationsToTabs(locations: Location[]) {
  const tagMap: Record<string, string> = {
    'CHH UK': 'chh-uk',
    'CHH Europe': 'chh-europe',
    'CHH Africa': 'chh-africa',
    'CHH on Campus': 'chh-campus',
  };

  // Group locations by tag
  const groupedByTag: Record<string, any[]> = {};

  locations.forEach((loc) => {
    const tag = loc.tag || 'CHH UK';
    if (!groupedByTag[tag]) {
      groupedByTag[tag] = [];
    }

    const services = parseServices(loc.services);

    groupedByTag[tag].push({
      slug: slugify(loc.name),
      title: loc.name,
      services: services,
      address: loc.address || '',
      image: loc.image_url,
      mapLink: loc.map_link || `https://maps.google.com/?q=${encodeURIComponent(loc.address || loc.name)}`,
      howToFindUs: loc.how_to_find_us || ''
    });
  });

  // Transform into the tab structure
  const tabs = Object.entries(groupedByTag).map(([tag, locations]) => ({
    id: tagMap[tag] || slugify(tag),
    name: tag,
    locations: locations
  }));

  // Sort tabs to ensure consistent order: UK, Europe, Africa, Campus
  const order = ['CHH UK', 'CHH Europe', 'CHH Africa', 'CHH on Campus'];
  return tabs.sort((a, b) => {
    const indexA = order.indexOf(a.name);
    const indexB = order.indexOf(b.name);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB; // Both in order list
    if (indexA !== -1) return -1; // Only A in order list
    if (indexB !== -1) return 1; // Only B in order list
    return a.name.localeCompare(b.name); // Neither in order list, alphabetical
  });
}
