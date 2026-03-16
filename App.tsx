import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { requestNotificationPermissions } from './src/services/notificationService';

export default function App() {
  useEffect(() => {
    // Request notification permissions on app start
    requestNotificationPermissions();
  }, []);

  return (
    <>
      <StatusBar style='auto' />
      <AppNavigator />
    </>
  );
}
