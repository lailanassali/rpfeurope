export function getContrastColor(hexColor: string): string {
 // Remove hash if present
 const hex = hexColor.replace('#', '');

 // Convert to RGB
 const r = parseInt(hex.substr(0, 2), 16);
 const g = parseInt(hex.substr(2, 2), 16);
 const b = parseInt(hex.substr(4, 2), 16);

 // Calculate luminance (YIQ formula)
 const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

 // Return black or white based on luminance
 return yiq >= 128 ? '#000000' : '#FFFFFF';
}
