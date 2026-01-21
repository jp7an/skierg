/**
 * Start group thresholds for Startled calculator
 * Based on W/kg (Medel trend W/kg)
 * A person is in a group if their W/kg >= threshold for that group
 * Choose the lowest group that is satisfied
 */

export interface StartGroup {
  name: string;
  threshold: number;
}

export const START_GROUPS: StartGroup[] = [
  { name: 'Elit', threshold: 3.64 },
  { name: '1', threshold: 3.12 },
  { name: '2', threshold: 2.82 },
  { name: '3', threshold: 2.51 },
  { name: '4', threshold: 2.31 },
  { name: '5', threshold: 2.17 },
  { name: '6', threshold: 2.07 },
  { name: '7', threshold: 1.98 },
  { name: '8', threshold: 1.89 },
  { name: '9', threshold: 1.81 },
];

/**
 * Determine start group based on W/kg ratio
 * @param wattsPerKg - Power per kilogram (W/kg)
 * @returns Start group name
 */
export function determineStartGroup(wattsPerKg: number): string {
  // Find the lowest group where W/kg >= threshold
  // Groups are ordered from highest to lowest threshold
  for (let i = 0; i < START_GROUPS.length; i++) {
    if (wattsPerKg >= START_GROUPS[i].threshold) {
      return START_GROUPS[i].name;
    }
  }
  // If below all thresholds
  return 'Under 9';
}

/**
 * Calculate Startled results
 * @param weightKg - Body weight in kg
 * @param time5kSeconds - 5000m time in seconds
 * @returns Object with watts, wattsPerKg, pace, and startGroup
 */
export function calculateStartled(weightKg: number, time5kSeconds: number) {
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
  const startGroup = determineStartGroup(wattsPerKg);

  return {
    watts: Math.round(watts),
    wattsPerKg: parseFloat(wattsPerKg.toFixed(2)),
    paceSeconds: parseFloat(paceSeconds.toFixed(1)),
    startGroup,
  };
}
