import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { StatCard, Loading } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useStats } from '../hooks/useStats';
import { useHabits } from '../hooks/useHabits';
import { useMultipleCompletions } from '../hooks/useCompletions';
import { calculateStreak } from '../utils/streakCalculator';
import { getLastNDays } from '../utils/dateHelpers';

interface StatsScreenProps {
  navigation: any;
}

export const StatsScreen: React.FC<StatsScreenProps> = () => {
  const { user } = useAuth();
  const { stats, loading: statsLoading } = useStats(user?.uid);
  const { habits, loading: habitsLoading } = useHabits(user?.uid);
  const habitIds = habits.map((h) => h.id);
  const { completionsMap, loading: completionsLoading } =
    useMultipleCompletions(habitIds);

  if (statsLoading || habitsLoading || completionsLoading) {
    return <Loading />;
  }

  // Calculate weekly completion rate
  const last7Days = getLastNDays(7);
  let totalPossibleCompletions = habits.length * 7;
  let totalActualCompletions = 0;

  habits.forEach((habit) => {
    const completions = completionsMap[habit.id] || [];
    last7Days.forEach((date) => {
      const completion = completions.find((c) => c.date === date);
      if (completion?.completed) {
        totalActualCompletions++;
      }
    });
  });

  const weeklyCompletionRate =
    totalPossibleCompletions > 0
      ? Math.round((totalActualCompletions / totalPossibleCompletions) * 100)
      : 0;

  // Calculate average streak
  let totalCurrentStreak = 0;
  habits.forEach((habit) => {
    const completions = completionsMap[habit.id] || [];
    const streakData = calculateStreak(completions);
    totalCurrentStreak += streakData.currentStreak;
  });
  const averageStreak =
    habits.length > 0 ? Math.round(totalCurrentStreak / habits.length) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Stats</Text>
        <Text style={styles.subtitle}>Track your progress</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>

          <StatCard
            icon='⚡'
            label='Total XP'
            value={stats?.xp || 0}
            color='#FFA726'
          />

          <StatCard
            icon='🎯'
            label='Current Level'
            value={stats?.level || 0}
            color='#2196F3'
          />

          <StatCard
            icon='✅'
            label='Total Habits Completed'
            value={stats?.totalHabitsCompleted || 0}
            color='#4CAF50'
          />

          <StatCard
            icon='🔥'
            label='Longest Streak'
            value={`${stats?.longestStreak || 0} days`}
            color='#F57C00'
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>

          <StatCard
            icon='📊'
            label='Weekly Completion Rate'
            value={`${weeklyCompletionRate}%`}
            color='#9C27B0'
          />

          <StatCard
            icon='📈'
            label='Habits Completed This Week'
            value={totalActualCompletions}
            color='#00BCD4'
          />

          <StatCard
            icon='🎯'
            label='Average Current Streak'
            value={`${averageStreak} days`}
            color='#FF5722'
          />
        </View>

        <View style={styles.motivationCard}>
          <Text style={styles.motivationEmoji} allowFontScaling={false}>
            💪
          </Text>
          <Text style={styles.motivationText}>
            {weeklyCompletionRate >= 80
              ? "You're crushing it! Keep up the great work!"
              : weeklyCompletionRate >= 50
                ? "Good progress! You're building strong habits!"
                : 'Every journey starts with a single step. Keep going!'}
          </Text>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  motivationCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  motivationEmoji: {
    fontSize: 48,
    marginBottom: 12,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  motivationText: {
    fontSize: 16,
    color: '#1976D2',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },
});
