import {
  paceToWatts,
  wattsToPace,
  calculateTimeFromWatts,
  calculateDistanceFromWatts,
  calculateRequiredWatts,
  calculateRequiredPace,
} from '../lib/skiergCalculations';

describe('skiergCalculations', () => {
  describe('paceToWatts', () => {
    it('should convert pace to watts using Concept2 formula', () => {
      const watts = paceToWatts(120); // 2:00/500m
      // Watt = 2.80 * (500/120)^3 ≈ 202.5 watts
      expect(watts).toBeGreaterThan(0);
      expect(watts).toBeCloseTo(202.5, 1);
    });

    it('should handle edge cases', () => {
      expect(paceToWatts(0)).toBe(0);
      expect(paceToWatts(-10)).toBe(0);
    });
  });

  describe('wattsToPace', () => {
    it('should convert watts to pace', () => {
      const pace = wattsToPace(200);
      expect(pace).toBeGreaterThan(0);
      // Verify round-trip conversion
      expect(paceToWatts(pace)).toBeCloseTo(200, 5);
    });

    it('should handle edge cases', () => {
      expect(wattsToPace(0)).toBe(0);
      expect(wattsToPace(-10)).toBe(0);
    });
  });

  describe('calculateTimeFromWatts', () => {
    it('should calculate time for given distance and watts', () => {
      const time = calculateTimeFromWatts(5000, 200);
      expect(time).toBeGreaterThan(0);
    });

    it('should handle edge cases', () => {
      expect(calculateTimeFromWatts(0, 200)).toBe(0);
      expect(calculateTimeFromWatts(5000, 0)).toBe(0);
    });
  });

  describe('calculateDistanceFromWatts', () => {
    it('should calculate distance for given time and watts', () => {
      const distance = calculateDistanceFromWatts(1200, 200); // 20 minutes
      expect(distance).toBeGreaterThan(0);
    });

    it('should handle edge cases', () => {
      expect(calculateDistanceFromWatts(0, 200)).toBe(0);
      expect(calculateDistanceFromWatts(1200, 0)).toBe(0);
    });
  });

  describe('calculateRequiredWatts', () => {
    it('should calculate required watts for distance and time', () => {
      const watts = calculateRequiredWatts(5000, 1200); // 5000m in 20 minutes
      expect(watts).toBeGreaterThan(0);
      
      // Verify consistency
      const calculatedTime = calculateTimeFromWatts(5000, watts);
      expect(calculatedTime).toBeCloseTo(1200, 1);
    });

    it('should handle edge cases', () => {
      expect(calculateRequiredWatts(0, 1200)).toBe(0);
      expect(calculateRequiredWatts(5000, 0)).toBe(0);
    });
  });

  describe('calculateRequiredPace', () => {
    it('should calculate required pace for distance and time', () => {
      const pace = calculateRequiredPace(5000, 1200); // 5000m in 20 minutes
      expect(pace).toBe(120); // 2:00/500m
    });

    it('should handle edge cases', () => {
      expect(calculateRequiredPace(0, 1200)).toBe(0);
      expect(calculateRequiredPace(5000, 0)).toBe(0);
    });
  });
});
