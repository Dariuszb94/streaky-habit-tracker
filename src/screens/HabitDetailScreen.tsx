import React, { useEffect } from 'react';
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
import { Loading, Button } from '../components';
import { useCompletions } from '../hooks/useCompletions';
import { getHabitById, deleteHabit } from '../services/habitService';
import { Habit } from '../types';
import { getLastNDays } from '../utils/dateHelpers';

interface HabitDetailScreenProps {
  route: any;
  navigation: any;
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
    habit?.userId,
  );

  useEffect(() => {
    loadHabit();
  }, [habitId]);

  const loadHabit = async () => {
    try {
      const habitData = await getHabitById(habitId);
      setHabit(habitData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load habit details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHabit(habitId);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete habit');
            }
          },
        },
      ],
    );
  };

  if (loading || !habit) {
    return <Loading />;
  }

  const last7Days = getLastNDays(7);
  const completionMap = completions.reduce(
    (acc, c) => {
      acc[c.date] = c.completed;
      return acc;
    },
    {} as Record<string, boolean>,
  );

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
              {completions.filter((c) => c.completed).length}
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
