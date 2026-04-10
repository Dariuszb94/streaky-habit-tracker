import { Alert } from 'react-native';
import { FirebaseError } from 'firebase/app';

/**
 * Error types that can occur in the app
 */
export enum ErrorType {
  NETWORK = 'network',
  AUTH = 'auth',
  PERMISSION = 'permission',
  NOT_FOUND = 'not_found',
  VALIDATION = 'validation',
  UNKNOWN = 'unknown',
}

/**
 * User-friendly error messages
 */
const ERROR_MESSAGES: Record<string, string> = {
  // Network errors
  'network-request-failed':
    'No internet connection. Please check your network and try again.',
  'internal-error': 'Something went wrong. Please try again later.',

  // Auth errors
  'auth/email-already-in-use':
    'This email is already registered. Please login instead.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/weak-password':
    'Password is too weak. Please use at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',

  // Firestore errors
  'permission-denied': "You don't have permission to perform this action.",
  unavailable: 'Service temporarily unavailable. Please try again.',
  'not-found': 'The requested item could not be found.',
};

/**
 * Get error type from Firebase error
 */
export const getErrorType = (error: any): ErrorType => {
  if (!error) return ErrorType.UNKNOWN;

  const code = error.code || '';

  if (code.includes('network') || code === 'unavailable') {
    return ErrorType.NETWORK;
  }

  if (code.startsWith('auth/')) {
    return ErrorType.AUTH;
  }

  if (code === 'permission-denied') {
    return ErrorType.PERMISSION;
  }

  if (code === 'not-found') {
    return ErrorType.NOT_FOUND;
  }

  return ErrorType.UNKNOWN;
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error: any): string => {
  if (!error) return 'An unexpected error occurred';

  // If it's a Firebase error with a code
  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }

  // If it's a custom error with a message
  if (error.message) {
    return error.message;
  }

  // Default message
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Show a user-friendly error alert
 */
export const showErrorAlert = (
  error: any,
  title: string = 'Error',
  onDismiss?: () => void
) => {
  const message = getErrorMessage(error);
  const errorType = getErrorType(error);

  // Log error for debugging
  console.error(`[${errorType}] ${title}:`, error);

  Alert.alert(title, message, [{ text: 'OK', onPress: onDismiss }]);
};

/**
 * Check if device is online
 */
export const isNetworkError = (error: any): boolean => {
  return getErrorType(error) === ErrorType.NETWORK;
};

/**
 * Retry wrapper for network operations
 */
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      // Don't retry if it's not a network error
      if (!isNetworkError(error)) {
        throw error;
      }

      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
};
