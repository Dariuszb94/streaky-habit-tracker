import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const getButtonStyle = () => {
    if (disabled) return [styles.button, styles.buttonDisabled];

    switch (variant) {
      case 'secondary':
        return [styles.button, styles.buttonSecondary];
      case 'outline':
        return [styles.button, styles.buttonOutline];
      default:
        return [styles.button, styles.buttonPrimary];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return [styles.text, styles.textOutline];
      default:
        return [styles.text, styles.textPrimary];
    }
  };
  const handlePress = () => {
    // Provide haptic feedback on button press
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), fullWidth && styles.fullWidth]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole='button'
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#2196F3' : '#fff'} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonPrimary: {
    backgroundColor: '#2196F3',
  },
  buttonSecondary: {
    backgroundColor: '#4CAF50',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: '#fff',
  },
  textOutline: {
    color: '#2196F3',
  },
});
