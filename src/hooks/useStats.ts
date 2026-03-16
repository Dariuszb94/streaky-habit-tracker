import { useState, useEffect, useCallback } from 'react';
import { UserStats } from '../types';
import { getUserStats } from '../services/statsService';
import { getXPProgress } from '../utils/xpCalculator';

export const useStats = (userId: string | undefined) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!userId) {
      setStats(null);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const userStats = await getUserStats(userId);
      setStats(userStats);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const xpProgress = stats ? getXPProgress(stats.xp) : null;

  return {
    stats,
    loading,
    error,
    xpProgress,
    refreshStats: fetchStats,
  };
};
