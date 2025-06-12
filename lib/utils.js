import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  const num = typeof price === 'string' ? parseFloat(price) : Number(price);
  if (isNaN(num)) {
    console.warn('Invalid price value:', price);
    return '0.00';
  }

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
