import { supabaseAdmin } from './supabase';

/**
 * Fetch a single hero image for a page
 * @param pageIdentifier - The page identifier (e.g., 'home_hero', 'youth_hero')
 * @param fallback - Optional fallback image URL
 * @returns Image URL or fallback
 */
const tableName = "page_images"
export async function getHeroImage(
 pageIdentifier: string,
 fallback: string = ''
): Promise<string> {
 try {
  // Fetch with no-store to prevent caching
  const { data, error } = await supabaseAdmin
   .from(tableName)
   .select('image_url')
   .eq('page_identifier', pageIdentifier)
   .eq('is_carousel', false)
   .limit(1)
   .single();

  if (error || !data) {
   console.log(`No image found for ${pageIdentifier}, using fallback`);
   return fallback;
  }

  return data.image_url;
 } catch (error) {
  console.error(`Error fetching hero image for ${pageIdentifier}:`, error);
  return fallback;
 }
}

/**
 * Fetch carousel images for a page (ordered by order field)
 * @param pageIdentifier - The page identifier (e.g., 'ministries_carousel')
 * @param fallback - Optional array of fallback image URLs
 * @returns Array of image URLs
 */
export async function getCarouselImages(
 pageIdentifier: string,
 fallback: string[] = []
): Promise<string[]> {
 try {
  // Fetch with no-store to prevent caching
  const { data, error } = await supabaseAdmin
   .from(tableName)
   .select('image_url, order')
   .eq('page_identifier', pageIdentifier)
   .eq('is_carousel', true)
   .order('order', { ascending: true });

  if (error || !data || data.length === 0) {
   console.log(`No carousel images found for ${pageIdentifier}, using fallback`);
   return fallback;
  }

  return data.map(img => img.image_url);
 } catch (error) {
  console.error(`Error fetching carousel images for ${pageIdentifier}:`, error);
  return fallback;
 }
}

/**
 * Fetch a carousel image by index
 * Useful when you need specific images from a carousel by position
 * @param pageIdentifier - The page identifier
 * @param index - Zero-based index of the image
 * @param fallback - Optional fallback image URL
 * @returns Image URL at the specified index or fallback
 */
export async function getCarouselImageByIndex(
 pageIdentifier: string,
 index: number,
 fallback: string = ''
): Promise<string> {
 try {
  const images = await getCarouselImages(pageIdentifier, []);
  return images[index] || fallback;
 } catch (error) {
  console.error(`Error fetching carousel image at index ${index}:`, error);
  return fallback;
 }
}

/**
 * Fetch images for all connect tabs
 * @returns Map of tab ID to image URL
 */
export async function getConnectTabImages(): Promise<Record<string, string>> {
 try {
  const tabIds = ['baptism', 'counselling', 'mentorship', 'serve', 'testimonies', 'prayer'];
  const imageMap: Record<string, string> = {};

  // We can fetch all these in parallel
  const promises = tabIds.map(async (tabId) => {
   const { data, error } = await supabaseAdmin
    .from(tableName)
    .select('image_url')
    .eq('page', `connect_${tabId}`)
    .limit(1)
    .single();

   if (!error && data) {
    return { id: tabId, url: data.image_url };
   }
   return null;
  });

  const results = await Promise.all(promises);

  results.forEach(result => {
   if (result) {
    imageMap[result.id] = result.url;
   }
  });

  return imageMap;
 } catch (error) {
  console.error('Error fetching connect tab images:', error);
  return {};
 }
}
