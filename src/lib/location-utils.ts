
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
      .neq('tag', '_CONFIG_')
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
      .neq('tag', '_CONFIG_')
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
      .neq('tag', '_CONFIG_')
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

export async function getLocationOrder(): Promise<string[]> {
  try {
    const { data } = await supabaseAdmin
      .from('locations')
      .select('welcome_description')
      .eq('tag', '_CONFIG_')
      .eq('name', 'TAG_ORDER')
      .single();

    if (data?.welcome_description) {
      return JSON.parse(data.welcome_description);
    }
    return ['RPF UK', 'RPF Europe', 'RPF Africa', 'RPF on Campus'];
  } catch (error) {
    console.error('Error fetching location order:', error);
    return ['RPF UK', 'RPF Europe', 'RPF Africa', 'RPF on Campus'];
  }
}

export function transformLocationsToTabs(locations: Location[], customOrder?: string[]) {
  const tagMap: Record<string, string> = {
    'RPF UK': 'rpf-uk',
    'RPF Europe': 'rpf-europe',
    'RPF Africa': 'rpf-africa',
    'RPF on Campus': 'rpf-campus',
  };

  // Group locations by tag
  const groupedByTag: Record<string, any[]> = {};

  locations.forEach((loc) => {
    let tag = loc.tag || 'CHH UK';
    // Rebranding text replacement
    tag = tag.replace(/CHH/g, 'RPF').replace(/Christ Healing Home/g, 'Redeemed Pillar of Fire');

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
  const order = customOrder || ['RPF UK', 'RPF Europe', 'RPF Africa', 'RPF on Campus'];
  return tabs.sort((a, b) => {
    const indexA = order.indexOf(a.name);
    const indexB = order.indexOf(b.name);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB; // Both in order list
    if (indexA !== -1) return -1; // Only A in order list
    if (indexB !== -1) return 1; // Only B in order list
    return a.name.localeCompare(b.name); // Neither in order list, alphabetical
  });
}
