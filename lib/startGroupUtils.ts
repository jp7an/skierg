/**
 * Start group thresholds for Startled calculator
 * Based on W/kg with three experience levels: liten, okej, stor
 * A person is in a group if their W/kg >= threshold for that group
 * Choose the lowest group that is satisfied
 */

export type SkiExperience = 'liten' | 'okej' | 'stor';

export interface StartGroup {
  name: string;
  thresholds: {
    liten: number;
    okej: number;
    stor: number;
  };
}

export const START_GROUPS: StartGroup[] = [
  { name: 'Elit', thresholds: { liten: 4.45, okej: 3.64, stor: 3.12 } },
  { name: '1', thresholds: { liten: 3.81, okej: 3.12, stor: 2.66 } },
  { name: '2', thresholds: { liten: 3.45, okej: 2.82, stor: 2.39 } },
  { name: '3', thresholds: { liten: 3.08, okej: 2.51, stor: 2.12 } },
  { name: '4', thresholds: { liten: 2.84, okej: 2.31, stor: 1.94 } },
  { name: '5', thresholds: { liten: 2.67, okej: 2.17, stor: 1.82 } },
  { name: '6', thresholds: { liten: 2.54, okej: 2.07, stor: 1.73 } },
  { name: '7', thresholds: { liten: 2.44, okej: 1.98, stor: 1.65 } },
  { name: '8', thresholds: { liten: 2.33, okej: 1.89, stor: 1.57 } },
  { name: '9', thresholds: { liten: 2.24, okej: 1.81, stor: 1.50 } },
];

/**
 * Determine start group based on W/kg ratio and ski experience
 * @param wattsPerKg - Power per kilogram (W/kg)
 * @param experience - Ski experience level (liten, okej, or stor)
 * @returns Start group name
 */
export function determineStartGroup(wattsPerKg: number, experience: SkiExperience = 'okej'): string {
  // Find the lowest group where W/kg >= threshold for chosen experience
  // Groups are ordered from highest to lowest threshold
  for (let i = 0; i < START_GROUPS.length; i++) {
    if (wattsPerKg >= START_GROUPS[i].thresholds[experience]) {
      return START_GROUPS[i].name;
    }
  }
  // If below all thresholds
  return 'Under 9';
}

/**
 * Calculate position within start group band (0 = lower end, 1 = upper end)
 * @param wattsPerKg - Power per kilogram (W/kg)
 * @param groupName - Start group name
 * @param experience - Ski experience level
 * @returns Position ratio (0-1, clamped) or null if group not found
 */
export function getPositionInGroup(wattsPerKg: number, groupName: string, experience: SkiExperience): number | null {
  const groupIndex = START_GROUPS.findIndex(g => g.name === groupName);
  if (groupIndex === -1 || groupName === 'Under 9') {
    return null;
  }
  
  const ELIT_HEADROOM_MULTIPLIER = 1.5;
  const currentGroup = START_GROUPS[groupIndex];
  const lowerThreshold = currentGroup.thresholds[experience];
  
  // Upper threshold is from previous group (if exists) or use a reasonable upper bound
  const upperThreshold = groupIndex > 0 
    ? START_GROUPS[groupIndex - 1].thresholds[experience]
    : lowerThreshold * ELIT_HEADROOM_MULTIPLIER; // For Elit group, add 50% headroom
  
  const range = upperThreshold - lowerThreshold;
  if (range <= 0) return 0.5;
  
  const position = (wattsPerKg - lowerThreshold) / range;
  return Math.max(0, Math.min(1, position)); // Clamp between 0 and 1
}

/**
 * Calculate Startled results
 * @param weightKg - Body weight in kg
 * @param time5kSeconds - 5000m time in seconds
 * @param experience - Ski experience level (default: 'okej')
 * @returns Object with watts, wattsPerKg, pace, startGroup, and position
 */
export function calculateStartled(weightKg: number, time5kSeconds: number, experience: SkiExperience = 'okej') {
  if (weightKg <= 0 || time5kSeconds <= 0) {
    return null;
  }

  // Calculate average pace for 5000m
  const paceSeconds = (time5kSeconds / 5000) * 500;
  
  // Calculate watts from pace using Concept2 formula
  const watts = 2.80 * Math.pow(500 / paceSeconds, 3);
  
  // Calculate W/kg
  const wattsPerKg = watts / weightKg;
  
  // Determine start group
  const startGroup = determineStartGroup(wattsPerKg, experience);
  
  // Calculate position within the group
  const position = getPositionInGroup(wattsPerKg, startGroup, experience);

  return {
    watts: Math.round(watts),
    wattsPerKg: parseFloat(wattsPerKg.toFixed(2)),
    paceSeconds: parseFloat(paceSeconds.toFixed(1)),
    startGroup,
    position,
  };
}
