import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Habit } from '../types';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Request notification permissions
 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
};

/**
 * Schedule a daily notification for a habit
 */
export const scheduleHabitReminder = async (
  habit: Habit,
): Promise<string | null> => {
  if (!habit.reminderTime) {
    return null;
  }

  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    return null;
  }

  // Parse reminder time (format: "HH:MM")
  const [hours, minutes] = habit.reminderTime.split(':').map(Number);

  // Cancel any existing notifications for this habit
  await cancelHabitReminder(habit.id);

  // Schedule daily notification
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: '🔥 Time for your habit!',
      body: `Don't forget to ${habit.name} ${habit.icon}`,
      data: { habitId: habit.id },
    },
    trigger: {
      hour: hours,
      minute: minutes,
      repeats: true,
    },
  });

  return notificationId;
};

/**
 * Cancel a habit reminder
 */
export const cancelHabitReminder = async (habitId: string): Promise<void> => {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();

  for (const notification of notifications) {
    if (notification.content.data?.habitId === habitId) {
      await Notifications.cancelScheduledNotificationAsync(
        notification.identifier,
      );
    }
  }
};

/**
 * Cancel all habit reminders
 */
export const cancelAllReminders = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

/**
 * Get notification token (for push notifications)
 */
export const getNotificationToken = async (): Promise<string | null> => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};
