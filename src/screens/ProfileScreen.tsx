import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatCard, Button, Loading } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useStats } from '../hooks/useStats';
import { ProfileStackParamList } from '../types';

type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'ProfileScreen'
>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const { user, logout } = useAuth();
  const { stats, loading } = useStats(user?.uid);

  // Memoize logout handler to prevent unnecessary function creation
  const handleLogout = useCallback(() => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();

            // Success feedback
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
              const {
                notificationAsync,
                NotificationFeedbackType,
              } = require('expo-haptics');
              notificationAsync(NotificationFeedbackType.Success);
            }
          } catch (error: any) {
            // Error feedback
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
              const {
                notificationAsync,
                NotificationFeedbackType,
              } = require('expo-haptics');
              notificationAsync(NotificationFeedbackType.Error);
            }

            Alert.alert(
              'Unable to Log Out',
              error.message || 'Something went wrong. Please try again.',
              [{ text: 'OK' }]
            );
          }
        },
      },
    ]);
  }, [logout]);

  // Memoize stats values to prevent unnecessary recalculations
  const level = useMemo(() => stats?.level || 0, [stats?.level]);
  const xp = useMemo(() => stats?.xp || 0, [stats?.xp]);
  const longestStreak = useMemo(
    () => stats?.longestStreak || 0,
    [stats?.longestStreak]
  );
  const totalCompletions = useMemo(
    () => stats?.totalHabitsCompleted || 0,
    [stats?.totalHabitsCompleted]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji} allowFontScaling={false}>
              👤
            </Text>
          </View>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.levelCard}>
          <Text style={styles.levelEmoji} allowFontScaling={false}>
            ⭐
          </Text>
          <Text style={styles.levelNumber}>Level {level}</Text>
          <Text style={styles.xpText}>{xp} XP</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>

          <StatCard
            icon='🔥'
            label='Longest Streak'
            value={`${longestStreak} days`}
            color='#F57C00'
          />

          <StatCard
            icon='✅'
            label='Total Completions'
            value={totalCompletions}
            color='#4CAF50'
          />

          <StatCard
            icon='⚡'
            label='Total XP Earned'
            value={xp}
            color='#FFA726'
          />
        </View>

        <View style={styles.milestones}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          <View style={styles.milestonesGrid}>
            <View style={styles.milestoneItem}>
              <Text style={styles.milestoneEmoji} allowFontScaling={false}>
                {(stats?.level || 0) >= 1 ? '🏆' : '🔒'}
              </Text>
              <Text style={styles.milestoneText}>Level 1</Text>
            </View>
            <View style={styles.milestoneItem}>
              <Text style={styles.milestoneEmoji} allowFontScaling={false}>
                {(stats?.level || 0) >= 5 ? '🏆' : '🔒'}
              </Text>
              <Text style={styles.milestoneText}>Level 5</Text>
            </View>
            <View style={styles.milestoneItem}>
              <Text style={styles.milestoneEmoji} allowFontScaling={false}>
                {(stats?.longestStreak || 0) >= 7 ? '🏆' : '🔒'}
              </Text>
              <Text style={styles.milestoneText}>7-Day Streak</Text>
            </View>
            <View style={styles.milestoneItem}>
              <Text style={styles.milestoneEmoji} allowFontScaling={false}>
                {(stats?.longestStreak || 0) >= 30 ? '🏆' : '🔒'}
              </Text>
              <Text style={styles.milestoneText}>30-Day Streak</Text>
            </View>
            <View style={styles.milestoneItem}>
              <Text style={styles.milestoneEmoji} allowFontScaling={false}>
                {(stats?.totalHabitsCompleted || 0) >= 100 ? '🏆' : '🔒'}
              </Text>
              <Text style={styles.milestoneText}>100 Completions</Text>
            </View>
            <View style={styles.milestoneItem}>
              <Text style={styles.milestoneEmoji} allowFontScaling={false}>
                {(stats?.level || 0) >= 10 ? '🏆' : '🔒'}
              </Text>
              <Text style={styles.milestoneText}>Level 10</Text>
            </View>
          </View>
        </View>

        <View style={styles.logoutSection}>
          <Button
            title='Log Out'
            onPress={handleLogout}
            variant='outline'
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Streaky v1.0.0</Text>
          <Text style={styles.footerText}>
            Build better habits, one day at a time
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
  },
  scrollContent: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 40,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  levelCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  levelEmoji: {
    fontSize: 48,
    marginBottom: 12,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  xpText: {
    fontSize: 16,
    color: '#666',
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
  milestones: {
    marginBottom: 24,
  },
  milestonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  milestoneItem: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneEmoji: {
    fontSize: 32,
    marginBottom: 8,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  milestoneText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  logoutSection: {
    marginTop: 12,
    marginBottom: 32,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
});
