import { differenceInDays, format } from 'date-fns';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return format(new Date(date), 'dd MMM yyyy');
}

export function calculateDays(start: Date, end: Date): number {
  const days = differenceInDays(new Date(end), new Date(start));
  return Math.max(1, days);
}

export function calculateRentalAmount(pricePerDay: number, days: number): number {
  return pricePerDay * days;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\\s+/g, '-')
    .replace(/[^\\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-');
}

export function generateBookingId(): string {
  const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BK-${randomChars}`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
