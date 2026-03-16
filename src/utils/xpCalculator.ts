/**
 * XP awarded for completing a habit
 */
export const XP_PER_COMPLETION = 10;

/**
 * Bonus XP for streak milestones
 */
export const STREAK_BONUSES: Record<number, number> = {
  7: 50, // 7-day streak bonus
  14: 100, // 14-day streak bonus
  30: 250, // 30-day streak bonus
  100: 1000, // 100-day streak bonus
};

/**
 * Calculate XP required for next level
 */
export const getXPForLevel = (level: number): number => {
  return level * 100;
};

/**
 * Calculate level from total XP
 */
export const getLevelFromXP = (xp: number): number => {
  return Math.floor(xp / 100);
};

/**
 * Calculate XP progress to next level
 */
export const getXPProgress = (
  xp: number,
): { current: number; required: number; percentage: number } => {
  const level = getLevelFromXP(xp);
  const currentLevelXP = level * 100;
  const nextLevelXP = (level + 1) * 100;
  const current = xp - currentLevelXP;
  const required = nextLevelXP - currentLevelXP;
  const percentage = (current / required) * 100;

  return {
    current,
    required,
    percentage,
  };
};

/**
 * Calculate XP earned from a completion
 */
export const calculateCompletionXP = (streak: number): number => {
  let xp = XP_PER_COMPLETION;

  // Add bonus XP for streak milestones
  if (STREAK_BONUSES[streak]) {
    xp += STREAK_BONUSES[streak];
  }

  return xp;
};

/**
 * Format XP display
 */
export const formatXP = (xp: number): string => {
  return `${xp} XP`;
};
