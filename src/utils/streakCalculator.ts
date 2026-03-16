import { HabitCompletion, StreakData } from '../types';
import { getTodayString, daysBetween } from './dateHelpers';

/**
 * Calculate current streak for a habit based on completions
 * A streak is broken if a day is missed
 */
export const calculateStreak = (completions: HabitCompletion[]): StreakData => {
  if (completions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
    };
  }

  // Sort completions by date (most recent first)
  const sortedCompletions = [...completions]
    .filter((c) => c.completed)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (sortedCompletions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
    };
  }

  const today = getTodayString();
  const mostRecent = sortedCompletions[0].date;

  // Check if the streak is still active (completed today or yesterday)
  const daysSinceLastCompletion = daysBetween(mostRecent, today);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate current streak (must be unbroken from today or yesterday)
  if (daysSinceLastCompletion <= 1) {
    let expectedDate = mostRecent;

    for (const completion of sortedCompletions) {
      const gap = daysBetween(completion.date, expectedDate);

      if (gap === 0) {
        currentStreak++;
        tempStreak++;
      } else if (gap === 1) {
        // Continue streak
        currentStreak++;
        tempStreak++;
        expectedDate = completion.date;
      } else {
        // Streak broken
        break;
      }

      if (
        sortedCompletions.indexOf(completion) <
        sortedCompletions.length - 1
      ) {
        expectedDate = completion.date;
      }
    }
  }

  // Calculate longest streak
  tempStreak = 1;
  let previousDate = sortedCompletions[0].date;

  for (let i = 1; i < sortedCompletions.length; i++) {
    const gap = daysBetween(sortedCompletions[i].date, previousDate);

    if (gap === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }

    previousDate = sortedCompletions[i].date;
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return {
    currentStreak,
    longestStreak,
    lastCompletionDate: mostRecent,
  };
};

/**
 * Check if a habit was completed today
 */
export const isCompletedToday = (completions: HabitCompletion[]): boolean => {
  const today = getTodayString();
  return completions.some((c) => c.date === today && c.completed);
};

/**
 * Get completion for a specific date
 */
export const getCompletionForDate = (
  completions: HabitCompletion[],
  date: string,
): HabitCompletion | undefined => {
  return completions.find((c) => c.date === date);
};
