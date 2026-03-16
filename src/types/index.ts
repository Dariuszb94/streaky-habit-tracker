export interface Habit {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
  reminderTime?: string;
  userId: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
  completedAt?: Date;
}

export interface UserStats {
  userId: string;
  xp: number;
  level: number;
  totalHabitsCompleted: number;
  longestStreak: number;
}

export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate: string | null;
}

export interface WeeklyStats {
  completionRate: number;
  totalCompletions: number;
  daysCompleted: number;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Stats: undefined;
  AddHabit: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  HabitDetail: { habitId: string };
};

export const HABIT_ICONS = [
  '💧',
  '📚',
  '🏃',
  '🧘',
  '🎯',
  '✍️',
  '🎨',
  '🎵',
  '💪',
  '🥗',
  '😴',
  '☕',
  '🌱',
  '📝',
  '🧠',
  '❤️',
  '⚡',
  '🔥',
] as const;

export type HabitIcon = (typeof HABIT_ICONS)[number];
