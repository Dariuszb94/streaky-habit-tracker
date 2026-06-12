import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Platform,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HabitCard, ProgressBar, Loading } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useHabits } from '../hooks/useHabits';
import { useStats } from '../hooks/useStats';
import { useMultipleCompletions } from '../hooks/useCompletions';
import { calculateStreak } from '../utils/streakCalculator';
import { toggleHabitCompletion } from '../services/completionService';
import { HomeStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const {
    habits,
    loading: habitsLoading,
    refreshHabits,
  } = useHabits(user?.uid);
  const { stats, xpProgress, refreshStats } = useStats(user?.uid);

  // Memoize habitIds to prevent unnecessary recalculations
  const habitIds = useMemo(() => habits.map(h => h.id), [habits]);

  const {
    completionsMap,
    loading: completionsLoading,
    refreshCompletions,
  } = useMultipleCompletions(habitIds);

  const [refreshing, setRefreshing] = React.useState(false);

  // Memoize refresh callback to prevent unnecessary function creation
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refreshHabits(), refreshStats(), refreshCompletions()]);
    setRefreshing(false);
  }, [refreshHabits, refreshStats, refreshCompletions]);

  // Memoize toggle handler to prevent unnecessary function creation
  const handleToggleHabit = useCallback(
    async (habitId: string) => {
      try {
        await toggleHabitCompletion(habitId);
        await refreshCompletions();
        await refreshStats();
        // Provide success feedback
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
          const { impactAsync, ImpactFeedbackStyle } = require('expo-haptics');
          impactAsync(ImpactFeedbackStyle.Heavy);
        }
      } catch (error: any) {
        Alert.alert(
          'Error',
          error.message || 'Failed to update habit. Please try again.',
          [{ text: 'OK' }]
        );
      }
    },
    [refreshCompletions, refreshStats]
  );

  // Memoize today's date string to avoid recalculating on every render
  const dateString = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    []
  );

  if (habitsLoading || completionsLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Today's Habits</Text>
          <Text style={styles.date}>{dateString}</Text>
        </View>
      </View>

      {stats && xpProgress && (
        <View style={styles.statsCard}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelLabel}>Level {stats.level}</Text>
            <Text style={styles.xpText}>
              {xpProgress.current} / {xpProgress.required} XP
            </Text>
          </View>
          <ProgressBar
            current={xpProgress.current}
            total={xpProgress.required}
            color='#4CAF50'
          />
        </View>
      )}

      {habits.length === 0 ? (
        <View
          style={styles.emptyState}
          accessibilityLabel='No habits created yet'
          accessibilityRole='text'
        >
          <Text style={styles.emptyEmoji} allowFontScaling={false}>
            🎯
          </Text>
          <Text style={styles.emptyTitle}>No habits yet</Text>
          <Text style={styles.emptyText}>
            Tap the + button below to create your first habit
          </Text>
        </View>
      ) : (
        <FlatList
          data={habits}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => {
            const completions = completionsMap[item.id] || [];
            const streakData = calculateStreak(completions);
            const isCompleted = completions.some(
              c =>
                c.date === new Date().toISOString().split('T')[0] && c.completed
            );

            return (
              <HabitCard
                habit={item}
                streak={streakData.currentStreak}
                isCompleted={isCompleted}
                onToggle={() => handleToggleHabit(item.id)}
                onPress={() =>
                  navigation.navigate('HabitDetail', { habitId: item.id })
                }
              />
            );
          }}
        />
      )}
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  statsCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  xpText: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    padding: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
