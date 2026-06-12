import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  streak: number;
  isCompleted: boolean;
  onToggle: () => void;
  onPress?: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  streak,
  isCompleted,
  onToggle,
  onPress,
}) => {
  const handleToggle = () => {
    // Provide haptic feedback when toggling habit completion
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onToggle();
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole='button'
      accessibilityLabel={`${habit.name} habit`}
      accessibilityHint='Double tap to view habit details'
    >
      <TouchableOpacity
        style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
        onPress={handleToggle}
        accessibilityRole='checkbox'
        accessibilityState={{ checked: isCompleted }}
        accessibilityLabel={`Mark ${habit.name} as ${isCompleted ? 'incomplete' : 'complete'}`}
      >
        {isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.habitInfo}>
          <Text
            style={styles.icon}
            allowFontScaling={false}
            accessibilityLabel={`Icon: ${habit.icon}`}
          >
            {habit.icon}
          </Text>
          <Text
            style={styles.habitName}
            accessibilityLabel={`Habit name: ${habit.name}`}
          >
            {habit.name}
          </Text>
        </View>

        <View
          style={styles.streakContainer}
          accessibilityLabel={`Streak: ${streak} day${streak !== 1 ? 's' : ''}`}
          accessibilityRole='text'
        >
          <Text style={styles.streakEmoji} allowFontScaling={false}>
            🔥
          </Text>
          <Text style={styles.streakText}>{streak} day streak</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  habitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: 4,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
  },
  streakText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F57C00',
  },
});
