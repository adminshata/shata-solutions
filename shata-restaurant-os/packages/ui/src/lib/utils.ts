import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format money using Intl.NumberFormat — never hardcode currency symbols
export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = "en"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format elapsed seconds as "5m 32s" or "1h 2m"
export function formatElapsed(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return s > 0 ? `${m}m ${s}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem > 0 ? `${h}h ${rem}m` : `${h}h`;
}

// Ticket time band: green → yellow → red
export function getTimeBand(elapsedSeconds: number): "green" | "yellow" | "red" {
  if (elapsedSeconds < 300) return "green";   // < 5 min
  if (elapsedSeconds < 600) return "yellow";  // 5–10 min
  return "red";                                // > 10 min
}
