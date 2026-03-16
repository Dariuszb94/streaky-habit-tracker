import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { HabitCompletion } from '../types';
import { getTodayString } from '../utils/dateHelpers';

const COMPLETIONS_COLLECTION = 'habitCompletions';

/**
 * Toggle habit completion for a specific date
 */
export const toggleHabitCompletion = async (
  habitId: string,
  date: string = getTodayString(),
): Promise<void> => {
  // Check if completion already exists
  const q = query(
    collection(db, COMPLETIONS_COLLECTION),
    where('habitId', '==', habitId),
    where('date', '==', date),
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Update existing completion
    const docRef = querySnapshot.docs[0].ref;
    const currentData = querySnapshot.docs[0].data();
    await updateDoc(docRef, {
      completed: !currentData.completed,
      completedAt: !currentData.completed ? Timestamp.now() : null,
    });
  } else {
    // Create new completion
    await addDoc(collection(db, COMPLETIONS_COLLECTION), {
      habitId,
      date,
      completed: true,
      completedAt: Timestamp.now(),
    });
  }
};

/**
 * Get completions for a specific habit
 */
export const getHabitCompletions = async (
  habitId: string,
): Promise<HabitCompletion[]> => {
  const q = query(
    collection(db, COMPLETIONS_COLLECTION),
    where('habitId', '==', habitId),
  );

  const querySnapshot = await getDocs(q);
  const completions: HabitCompletion[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    completions.push({
      id: doc.id,
      habitId: data.habitId,
      date: data.date,
      completed: data.completed,
      completedAt: data.completedAt?.toDate(),
    });
  });

  return completions;
};

/**
 * Get completion status for today
 */
export const getTodayCompletion = async (habitId: string): Promise<boolean> => {
  const today = getTodayString();
  const q = query(
    collection(db, COMPLETIONS_COLLECTION),
    where('habitId', '==', habitId),
    where('date', '==', today),
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return false;
  }

  return querySnapshot.docs[0].data().completed;
};

/**
 * Get completions for multiple habits
 */
export const getMultipleHabitsCompletions = async (
  habitIds: string[],
): Promise<Record<string, HabitCompletion[]>> => {
  const completionsMap: Record<string, HabitCompletion[]> = {};

  // Initialize empty arrays for each habit
  habitIds.forEach((id) => {
    completionsMap[id] = [];
  });

  // Fetch completions for all habits
  const q = query(
    collection(db, COMPLETIONS_COLLECTION),
    where('habitId', 'in', habitIds),
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const completion: HabitCompletion = {
      id: doc.id,
      habitId: data.habitId,
      date: data.date,
      completed: data.completed,
      completedAt: data.completedAt?.toDate(),
    };

    if (completionsMap[completion.habitId]) {
      completionsMap[completion.habitId].push(completion);
    }
  });

  return completionsMap;
};
