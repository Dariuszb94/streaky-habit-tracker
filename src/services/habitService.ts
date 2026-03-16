import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Habit } from '../types';

const HABITS_COLLECTION = 'habits';

/**
 * Create a new habit
 */
export const createHabit = async (
  habit: Omit<Habit, 'id' | 'createdAt'>,
): Promise<string> => {
  const habitData = {
    ...habit,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(collection(db, HABITS_COLLECTION), habitData);
  return docRef.id;
};

/**
 * Get all habits for a user
 */
export const getUserHabits = async (userId: string): Promise<Habit[]> => {
  const q = query(
    collection(db, HABITS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'asc'),
  );

  const querySnapshot = await getDocs(q);
  const habits: Habit[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    habits.push({
      id: doc.id,
      name: data.name,
      icon: data.icon,
      createdAt: data.createdAt.toDate(),
      reminderTime: data.reminderTime,
      userId: data.userId,
    });
  });

  return habits;
};

/**
 * Get a single habit by ID
 */
export const getHabitById = async (habitId: string): Promise<Habit | null> => {
  const docRef = doc(db, HABITS_COLLECTION, habitId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  return {
    id: docSnap.id,
    name: data.name,
    icon: data.icon,
    createdAt: data.createdAt.toDate(),
    reminderTime: data.reminderTime,
    userId: data.userId,
  };
};

/**
 * Update a habit
 */
export const updateHabit = async (
  habitId: string,
  updates: Partial<Omit<Habit, 'id' | 'userId' | 'createdAt'>>,
): Promise<void> => {
  const docRef = doc(db, HABITS_COLLECTION, habitId);
  await updateDoc(docRef, updates);
};

/**
 * Delete a habit
 */
export const deleteHabit = async (habitId: string): Promise<void> => {
  const docRef = doc(db, HABITS_COLLECTION, habitId);
  await deleteDoc(docRef);
};
