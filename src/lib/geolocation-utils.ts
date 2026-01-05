/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Find the nearest location from user's position
 * @param userLat User's latitude
 * @param userLon User's longitude
 * @param locations Array of locations with coordinates
 * @returns Nearest location and its distance
 */
export function findNearestLocation<T extends { latitude: number | null; longitude: number | null }>(
  userLat: number,
  userLon: number,
  locations: T[]
): { location: T; distance: number } | null {
  // Filter out locations without coordinates
  const validLocations = locations.filter(
    (loc) => loc.latitude !== null && loc.longitude !== null
  );

  if (validLocations.length === 0) {
    return null;
  }

  let nearest = validLocations[0];
  let minDistance = calculateDistance(
    userLat,
    userLon,
    nearest.latitude!,
    nearest.longitude!
  );

  for (const location of validLocations) {
    const distance = calculateDistance(
      userLat,
      userLon,
      location.latitude!,
      location.longitude!
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = location;
    }
  }

  return {
    location: nearest,
    distance: minDistance,
  };
}

/**
 * Get user's current position using Geolocation API
 * @returns Promise with coordinates
 */
export function getUserLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied. Please enable location access.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information unavailable.'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out.'));
            break;
          default:
            reject(new Error('An unknown error occurred.'));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
}

/**
 * Convert kilometers to miles
 * @param km Distance in kilometers
 * @returns Distance in miles, rounded to 1 decimal place
 */
export function kmToMiles(km: number): number {
  return Math.round(km * 0.621371 * 10) / 10;
}
