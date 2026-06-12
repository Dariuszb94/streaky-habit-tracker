import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Loading, Button } from '../components';
import { useCompletions } from '../hooks/useCompletions';
import { getHabitById, deleteHabit } from '../services/habitService';
import { Habit, HomeStackParamList } from '../types';
import { getLastNDays } from '../utils/dateHelpers';

type HabitDetailNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'HabitDetail'
>;

type HabitDetailRouteProp = RouteProp<HomeStackParamList, 'HabitDetail'>;

interface HabitDetailScreenProps {
  route: HabitDetailRouteProp;
  navigation: HabitDetailNavigationProp;
}

export const HabitDetailScreen: React.FC<HabitDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { habitId } = route.params;
  const [habit, setHabit] = React.useState<Habit | null>(null);
  const [loading, setLoading] = React.useState(true);

  const { completions, streak, refreshCompletions } = useCompletions(
    habitId,
    habit?.userId
  );

  useEffect(() => {
    loadHabit();
  }, [habitId]);

  const loadHabit = async () => {
    try {
      const habitData = await getHabitById(habitId);
      setHabit(habitData);
    } catch (error: any) {
      Alert.alert(
        'Error Loading Habit',
        error.message || 'Unable to load habit details. Please try again.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  // Memoize delete handler to prevent unnecessary function creation
  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit? All progress and history will be permanently lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHabit(habitId);

              // Success feedback with haptic
              if (Platform.OS === 'ios' || Platform.OS === 'android') {
                const {
                  notificationAsync,
                  NotificationFeedbackType,
                } = require('expo-haptics');
                notificationAsync(NotificationFeedbackType.Success);
              }

              navigation.goBack();
            } catch (error: any) {
              // Error feedback with haptic
              if (Platform.OS === 'ios' || Platform.OS === 'android') {
                const {
                  notificationAsync,
                  NotificationFeedbackType,
                } = require('expo-haptics');
                notificationAsync(NotificationFeedbackType.Error);
              }

              Alert.alert(
                'Unable to Delete',
                error.message || 'Failed to delete habit. Please try again.',
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  }, [habitId, navigation]);

  // Memoize dates and completion data to prevent unnecessary recalculations
  const last7Days = useMemo(() => getLastNDays(7), []);
  const completionMap = useMemo(
    () =>
      completions.reduce(
        (acc, c) => {
          acc[c.date] = c.completed;
          return acc;
        },
        {} as Record<string, boolean>
      ),
    [completions]
  );

  if (loading || !habit) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.icon} allowFontScaling={false}>
            {habit.icon}
          </Text>
          <Text style={styles.title}>{habit.name}</Text>
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji} allowFontScaling={false}>
            🔥
          </Text>
          <Text style={styles.streakNumber}>{streak.currentStreak}</Text>
          <Text style={styles.streakLabel}>Day Streak</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{streak.longestStreak}</Text>
            <Text style={styles.statLabel}>Longest Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {completions.filter(c => c.completed).length}
            </Text>
            <Text style={styles.statLabel}>Total Completions</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last 7 Days</Text>
          <View style={styles.weekView}>
            {last7Days.map((date, index) => {
              const isCompleted = completionMap[date];
              const dayName = new Date(date).toLocaleDateString('en-US', {
                weekday: 'short',
              });

              return (
                <View key={date} style={styles.dayColumn}>
                  <View
                    style={[
                      styles.dayCircle,
                      isCompleted && styles.dayCircleCompleted,
                    ]}
                  >
                    {isCompleted && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.dayLabel}>{dayName}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {habit.reminderTime && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reminder</Text>
            <Text style={styles.reminderText}>
              Daily at {habit.reminderTime}
            </Text>
          </View>
        )}

        <View style={styles.dangerZone}>
          <Button
            title='Delete Habit'
            onPress={handleDelete}
            variant='outline'
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    fontSize: 64,
    marginBottom: 12,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  streakCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  streakEmoji: {
    fontSize: 48,
    marginBottom: 12,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 4,
  },
  streakLabel: {
    fontSize: 16,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dayCircleCompleted: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
  },
  reminderText: {
    fontSize: 16,
    color: '#333',
  },
  dangerZone: {
    marginTop: 24,
  },
});
