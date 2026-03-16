import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components';
import {
  OnboardingScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  AddHabitScreen,
  HabitDetailScreen,
  StatsScreen,
  ProfileScreen,
} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

// Home stack navigator
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name='HabitDetail'
        component={HabitDetailScreen}
        options={{
          headerTitle: 'Habit Details',
          headerBackTitleVisible: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

// Auth stack navigator
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='Login' component={LoginScreen} />
      <AuthStack.Screen name='Register' component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

// Main tab navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'AddHabit') {
            iconName = 'add-circle';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#999',
        tabBarShowLabel: true,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name='Stats'
        component={StatsScreen}
        options={{ tabBarLabel: 'Stats' }}
      />
      <Tab.Screen
        name='AddHabit'
        component={AddHabitScreen}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='add-circle' size={size + 8} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

// Root navigator
const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
          <Stack.Screen name='Auth' component={AuthStackNavigator} />
        </>
      ) : (
        <Stack.Screen name='Main' component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

// Main navigation component
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};
