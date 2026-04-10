import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, IconPicker } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useHabits } from '../hooks/useHabits';
import { HABIT_ICONS } from '../types';

interface AddHabitScreenProps {
  navigation: any;
}

export const AddHabitScreen: React.FC<AddHabitScreenProps> = ({
  navigation,
}) => {
  const { user } = useAuth();
  const { createHabit, loading } = useHabits(user?.uid);

  const [habitName, setHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(HABIT_ICONS[0]);
  const [reminderTime, setReminderTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatTimeForDisplay = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleCreate = async () => {
    if (!habitName.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    try {
      Keyboard.dismiss();
      await createHabit({
        name: habitName.trim(),
        icon: selectedIcon,
        reminderTime: reminderTime
          ? formatTimeForDisplay(reminderTime)
          : undefined,
      });

      Alert.alert('Success', 'Habit created!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);

      // Reset form
      setHabitName('');
      setSelectedIcon(HABIT_ICONS[0]);
      setReminderTime(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to create habit');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create New Habit</Text>
          <Text style={styles.subtitle}>
            Build a new habit and start your streak
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Habit Name *</Text>
            <TextInput
              style={styles.input}
              value={habitName}
              onChangeText={setHabitName}
              placeholder='e.g., Drink 8 glasses of water'
              maxLength={50}
              returnKeyType='done'
              onSubmitEditing={handleCreate}
              accessibilityLabel='Habit name input'
            />
          </View>

          <IconPicker
            selectedIcon={selectedIcon}
            onSelectIcon={setSelectedIcon}
          />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Daily Reminder (Optional)</Text>
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.timeButtonText}>
                {reminderTime
                  ? formatTimeForDisplay(reminderTime)
                  : 'Set reminder time'}
              </Text>
            </TouchableOpacity>
            {reminderTime && (
              <TouchableOpacity
                onPress={() => setReminderTime(null)}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>Clear reminder</Text>
              </TouchableOpacity>
            )}
          </View>

          {showTimePicker && (
            <DateTimePicker
              value={reminderTime || new Date()}
              mode='time'
              is24Hour={false}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setReminderTime(selectedDate);
                }
              }}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title='Create Habit'
          onPress={handleCreate}
          loading={loading}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  timeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginTop: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#2196F3',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
