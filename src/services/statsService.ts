import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { UserStats } from '../types';

const STATS_COLLECTION = 'userStats';

/**
 * Initialize user stats
 */
export const initializeUserStats = async (userId: string): Promise<void> => {
  const docRef = doc(db, STATS_COLLECTION, userId);
  await setDoc(docRef, {
    userId,
    xp: 0,
    level: 0,
    totalHabitsCompleted: 0,
    longestStreak: 0,
  });
};

/**
 * Get user stats
 */
export const getUserStats = async (userId: string): Promise<UserStats> => {
  const docRef = doc(db, STATS_COLLECTION, userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    // Initialize if doesn't exist
    await initializeUserStats(userId);
    return {
      userId,
      xp: 0,
      level: 0,
      totalHabitsCompleted: 0,
      longestStreak: 0,
    };
  }

  const data = docSnap.data();
  return {
    userId: data.userId,
    xp: data.xp,
    level: data.level,
    totalHabitsCompleted: data.totalHabitsCompleted,
    longestStreak: data.longestStreak,
  };
};

/**
 * Add XP to user stats
 */
export const addXP = async (
  userId: string,
  xpAmount: number,
): Promise<void> => {
  const docRef = doc(db, STATS_COLLECTION, userId);

  // Get current stats
  const stats = await getUserStats(userId);
  const newXP = stats.xp + xpAmount;
  const newLevel = Math.floor(newXP / 100);

  await updateDoc(docRef, {
    xp: newXP,
    level: newLevel,
  });
};

/**
 * Increment total habits completed
 */
export const incrementHabitsCompleted = async (
  userId: string,
): Promise<void> => {
  const docRef = doc(db, STATS_COLLECTION, userId);
  await updateDoc(docRef, {
    totalHabitsCompleted: increment(1),
  });
};

/**
 * Update longest streak if current is higher
 */
export const updateLongestStreak = async (
  userId: string,
  currentStreak: number,
): Promise<void> => {
  const stats = await getUserStats(userId);

  if (currentStreak > stats.longestStreak) {
    const docRef = doc(db, STATS_COLLECTION, userId);
    await updateDoc(docRef, {
      longestStreak: currentStreak,
    });
  }
};
