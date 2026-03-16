import { useState, useEffect, useCallback } from 'react';
import { HabitCompletion } from '../types';
import {
  toggleHabitCompletion as toggleCompletionService,
  getHabitCompletions,
  getMultipleHabitsCompletions,
} from '../services/completionService';
import {
  addXP,
  incrementHabitsCompleted,
  updateLongestStreak,
} from '../services/statsService';
import { calculateStreak } from '../utils/streakCalculator';
import { calculateCompletionXP } from '../utils/xpCalculator';
import { getTodayString } from '../utils/dateHelpers';

export const useCompletions = (
  habitId: string | undefined,
  userId: string | undefined,
) => {
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompletions = useCallback(async () => {
    if (!habitId) {
      setCompletions([]);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const habitCompletions = await getHabitCompletions(habitId);
      setCompletions(habitCompletions);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch completions');
    } finally {
      setLoading(false);
    }
  }, [habitId]);

  useEffect(() => {
    fetchCompletions();
  }, [fetchCompletions]);

  const toggleCompletion = async (date: string = getTodayString()) => {
    if (!habitId || !userId) {
      throw new Error('Habit ID and User ID required');
    }

    try {
      setError(null);

      // Check current completion status
      const existingCompletion = completions.find((c) => c.date === date);
      const wasCompleted = existingCompletion?.completed || false;

      // Toggle completion
      await toggleCompletionService(habitId, date);

      // If marking as completed, award XP
      if (!wasCompleted) {
        const newCompletions = await getHabitCompletions(habitId);
        const streakData = calculateStreak(newCompletions);
        const xpEarned = calculateCompletionXP(streakData.currentStreak);

        await addXP(userId, xpEarned);
        await incrementHabitsCompleted(userId);
        await updateLongestStreak(userId, streakData.currentStreak);
      }

      await fetchCompletions();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle completion');
      throw err;
    }
  };

  const streak = calculateStreak(completions);
  const isCompletedToday = completions.some(
    (c) => c.date === getTodayString() && c.completed,
  );

  return {
    completions,
    loading,
    error,
    toggleCompletion,
    refreshCompletions: fetchCompletions,
    streak,
    isCompletedToday,
  };
};

// Hook for managing multiple habits' completions
export const useMultipleCompletions = (habitIds: string[]) => {
  const [completionsMap, setCompletionsMap] = useState<
    Record<string, HabitCompletion[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompletions = useCallback(async () => {
    if (habitIds.length === 0) {
      setCompletionsMap({});
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const completions = await getMultipleHabitsCompletions(habitIds);
      setCompletionsMap(completions);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch completions');
    } finally {
      setLoading(false);
    }
  }, [habitIds.join(',')]);

  useEffect(() => {
    fetchCompletions();
  }, [fetchCompletions]);

  return {
    completionsMap,
    loading,
    error,
    refreshCompletions: fetchCompletions,
  };
};
