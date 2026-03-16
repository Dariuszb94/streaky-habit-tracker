import {
  format,
  parseISO,
  startOfDay,
  differenceInDays,
  subDays,
} from 'date-fns';

/**
 * Format a date to YYYY-MM-DD string
 */
export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayString = (): string => {
  return formatDate(new Date());
};

/**
 * Parse YYYY-MM-DD string to Date
 */
export const parseDate = (dateString: string): Date => {
  return parseISO(dateString);
};

/**
 * Check if two date strings are the same day
 */
export const isSameDay = (date1: string, date2: string): boolean => {
  return date1 === date2;
};

/**
 * Get date string for n days ago
 */
export const getDaysAgo = (days: number): string => {
  return formatDate(subDays(new Date(), days));
};

/**
 * Calculate days between two dates
 */
export const daysBetween = (date1: string, date2: string): number => {
  return differenceInDays(parseDate(date2), parseDate(date1));
};

/**
 * Get an array of date strings for the last n days
 */
export const getLastNDays = (n: number): string[] => {
  const dates: string[] = [];
  const today = new Date();

  for (let i = n - 1; i >= 0; i--) {
    dates.push(formatDate(subDays(today, i)));
  }

  return dates;
};

/**
 * Format time string for display (e.g., "09:00" -> "9:00 AM")
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};
