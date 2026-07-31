import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDateSafe(input: unknown): Date {
  if (!input) return new Date();
  if (input instanceof Date) return isNaN(input.getTime()) ? new Date() : input;
  if (Array.isArray(input)) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = input as number[];
    const d = new Date(year, (month || 1) - 1, day || 1, hour, minute, second);
    return isNaN(d.getTime()) ? new Date() : d;
  }
  const d = new Date(input as string | number);
  return isNaN(d.getTime()) ? new Date() : d;
}

export function formatDateSafe(input: unknown, formatStr: string, fallback = "-"): string {
  if (!input) return fallback;
  try {
    const d = parseDateSafe(input);
    return format(d, formatStr);
  } catch {
    return fallback;
  }
}

export function formatDistanceSafe(input: unknown, fallback = "recently"): string {
  if (!input) return fallback;
  try {
    const d = parseDateSafe(input);
    return formatDistanceToNow(d, { addSuffix: true });
  } catch {
    return fallback;
  }
}
