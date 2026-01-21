import { START_GROUP_THRESHOLDS, START_GROUPS, ExperienceLevel, StartGroup } from './constants';

/**
 * Calculate watts from 5k time using Concept2 formula
 * W = 2.80 / (t/500)^3 where t is seconds per 500m
 * Simplified: W = 2.80 * 500^3 / t^3 = 350,000,000 / t^3
 */
export function calculateWatts(time5k: number): number {
  // time5k is in seconds (total time for 5000m)
  const timePer500m = time5k / 10; // 5000m / 500m = 10 splits
  const watts = 2.80 / Math.pow(timePer500m / 500, 3);
  return watts;
}

/**
 * Calculate W/kg (watts per kilogram)
 */
export function calculateWattsPerKg(watts: number, weightKg: number): number {
  return watts / weightKg;
}

/**
 * Calculate tempo per 500m (seconds)
 */
export function calculateTempoPer500m(time5k: number): number {
  return time5k / 10; // 5000m / 500m = 10 splits
}

/**
 * Determine start group based on W/kg and experience level
 * Returns the lowest start group whose threshold is <= computed W/kg
 * If W/kg exceeds Elit threshold, returns Elit
 */
export function determineStartGroup(
  wattsPerKg: number,
  experience: ExperienceLevel
): StartGroup {
  // Check from Elit down to 9
  for (const group of START_GROUPS) {
    const threshold = START_GROUP_THRESHOLDS[group][experience];
    if (wattsPerKg >= threshold) {
      return group;
    }
  }
  
  // If below all thresholds, return the lowest group (9)
  return '9';
}

/**
 * Parse time string in format MM:SS or MM:SS.ms to seconds
 */
export function parseTimeToSeconds(timeStr: string): number | null {
  const parts = timeStr.split(':');
  if (parts.length !== 2) return null;
  
  const minutes = parseInt(parts[0], 10);
  const seconds = parseFloat(parts[1]);
  
  if (isNaN(minutes) || isNaN(seconds)) return null;
  if (minutes < 0 || seconds < 0 || seconds >= 60) return null;
  
  return minutes * 60 + seconds;
}

/**
 * Format seconds to MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1);
  return `${mins}:${secs.padStart(4, '0')}`;
}
