import { useState, useEffect, useCallback } from 'react';
import { Habit } from '../types';
import {
  createHabit as createHabitService,
  getUserHabits,
  updateHabit as updateHabitService,
  deleteHabit as deleteHabitService,
} from '../services/habitService';
import {
  scheduleHabitReminder,
  cancelHabitReminder,
} from '../services/notificationService';

export const useHabits = (userId: string | undefined) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = useCallback(async () => {
    if (!userId) {
      setHabits([]);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const userHabits = await getUserHabits(userId);
      setHabits(userHabits);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const createHabit = async (
    habitData: Omit<Habit, 'id' | 'createdAt' | 'userId'>,
  ) => {
    if (!userId) {
      throw new Error('User not authenticated');
    }

    try {
      setError(null);
      const habitId = await createHabitService({
        ...habitData,
        userId,
      });

      // Schedule notification if reminder time is set
      if (habitData.reminderTime) {
        await scheduleHabitReminder({
          id: habitId,
          ...habitData,
          userId,
          createdAt: new Date(),
        });
      }

      await fetchHabits();
      return habitId;
    } catch (err: any) {
      setError(err.message || 'Failed to create habit');
      throw err;
    }
  };

  const updateHabit = async (
    habitId: string,
    updates: Partial<Omit<Habit, 'id' | 'userId' | 'createdAt'>>,
  ) => {
    try {
      setError(null);
      await updateHabitService(habitId, updates);

      // Update notification if reminder time changed
      const habit = habits.find((h) => h.id === habitId);
      if (habit) {
        if (updates.reminderTime !== undefined) {
          await cancelHabitReminder(habitId);
          if (updates.reminderTime) {
            await scheduleHabitReminder({
              ...habit,
              ...updates,
            } as Habit);
          }
        }
      }

      await fetchHabits();
    } catch (err: any) {
      setError(err.message || 'Failed to update habit');
      throw err;
    }
  };

  const deleteHabit = async (habitId: string) => {
    try {
      setError(null);
      await deleteHabitService(habitId);
      await cancelHabitReminder(habitId);
      await fetchHabits();
    } catch (err: any) {
      setError(err.message || 'Failed to delete habit');
      throw err;
    }
  };

  return {
    habits,
    loading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    refreshHabits: fetchHabits,
  };
};
