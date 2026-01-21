/**
 * Concept2 formula: Watt = 2.80 * (500 / pace)^3
 * where pace is in seconds per 500m
 */

/**
 * Convert pace (tempo per 500m in seconds) to watts
 * @param paceSeconds - Pace in seconds per 500m
 * @returns Power in watts
 */
export function paceToWatts(paceSeconds: number): number {
  if (paceSeconds <= 0) {
    return 0;
  }
  return 2.80 * Math.pow(500 / paceSeconds, 3);
}

/**
 * Convert watts to pace (tempo per 500m in seconds)
 * @param watts - Power in watts
 * @returns Pace in seconds per 500m
 */
export function wattsToPace(watts: number): number {
  if (watts <= 0) {
    return 0;
  }
  return 500 / Math.pow(watts / 2.80, 1/3);
}

/**
 * Calculate time for a given distance and watts
 * @param distanceMeters - Distance in meters
 * @param watts - Power in watts
 * @returns Time in seconds
 */
export function calculateTimeFromWatts(distanceMeters: number, watts: number): number {
  if (watts <= 0 || distanceMeters <= 0) {
    return 0;
  }
  const paceSeconds = wattsToPace(watts);
  return (distanceMeters / 500) * paceSeconds;
}

/**
 * Calculate time for a given distance and pace
 * @param distanceMeters - Distance in meters
 * @param paceSeconds - Pace in seconds per 500m
 * @returns Time in seconds
 */
export function calculateTimeFromPace(distanceMeters: number, paceSeconds: number): number {
  if (paceSeconds <= 0 || distanceMeters <= 0) {
    return 0;
  }
  return (distanceMeters / 500) * paceSeconds;
}

/**
 * Calculate distance for a given time and watts
 * @param timeSeconds - Time in seconds
 * @param watts - Power in watts
 * @returns Distance in meters
 */
export function calculateDistanceFromWatts(timeSeconds: number, watts: number): number {
  if (watts <= 0 || timeSeconds <= 0) {
    return 0;
  }
  const paceSeconds = wattsToPace(watts);
  return (timeSeconds / paceSeconds) * 500;
}

/**
 * Calculate distance for a given time and pace
 * @param timeSeconds - Time in seconds
 * @param paceSeconds - Pace in seconds per 500m
 * @returns Distance in meters
 */
export function calculateDistanceFromPace(timeSeconds: number, paceSeconds: number): number {
  if (paceSeconds <= 0 || timeSeconds <= 0) {
    return 0;
  }
  return (timeSeconds / paceSeconds) * 500;
}

/**
 * Calculate required watts for a specific distance and time
 * @param distanceMeters - Distance in meters
 * @param timeSeconds - Time in seconds
 * @returns Required watts
 */
export function calculateRequiredWatts(distanceMeters: number, timeSeconds: number): number {
  if (distanceMeters <= 0 || timeSeconds <= 0) {
    return 0;
  }
  const paceSeconds = (timeSeconds / distanceMeters) * 500;
  return paceToWatts(paceSeconds);
}

/**
 * Calculate required pace for a specific distance and time
 * @param distanceMeters - Distance in meters
 * @param timeSeconds - Time in seconds
 * @returns Required pace in seconds per 500m
 */
export function calculateRequiredPace(distanceMeters: number, timeSeconds: number): number {
  if (distanceMeters <= 0 || timeSeconds <= 0) {
    return 0;
  }
  return (timeSeconds / distanceMeters) * 500;
}
