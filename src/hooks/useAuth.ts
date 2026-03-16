import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  registerUser,
  loginUser,
  logoutUser,
  onAuthChange,
  getCurrentUser,
} from '../services/authService';
import { initializeUserStats } from '../services/statsService';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(getCurrentUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const newUser = await registerUser(email, password);

      // Initialize user stats
      await initializeUserStats(newUser.uid);

      setUser(newUser);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await logoutUser();
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Logout failed');
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
  };
};
