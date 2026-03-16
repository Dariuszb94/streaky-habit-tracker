import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components';

interface OnboardingScreenProps {
  navigation: any;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons
            name='flame'
            size={80}
            color='#FF6B35'
            style={styles.emoji}
          />
          <Text style={styles.title}>Welcome to Streaky</Text>
          <Text style={styles.subtitle}>
            Build lasting habits with daily streaks and gamification
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons
              name='checkmark-circle'
              size={32}
              color='#4CAF50'
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Track daily habits</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons
              name='flame'
              size={32}
              color='#FF6B35'
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Build streaks</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons
              name='flash'
              size={32}
              color='#FFC107'
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Earn XP and level up</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons
              name='flag'
              size={32}
              color='#2196F3'
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Stay motivated</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title='Get Started'
            onPress={() => navigation.navigate('Auth')}
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  emoji: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  features: {
    marginVertical: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIcon: {
    marginRight: 16,
  },
  featureText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
