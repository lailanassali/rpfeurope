import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).replace(/(\d+)/, (d) => {
    const n = parseInt(d);
    const suffix = ['th','st','nd','rd'][(n % 10 > 3 || Math.floor(n % 100 / 10) === 1) ? 0 : n % 10] ?? 'th';
    return `${n}${suffix}`;
  });
}
