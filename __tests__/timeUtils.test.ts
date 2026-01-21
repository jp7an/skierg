import { parseTimeToSeconds, formatSecondsToTime } from '../lib/timeUtils';

describe('timeUtils', () => {
  describe('parseTimeToSeconds', () => {
    it('should parse mm:ss.d format', () => {
      expect(parseTimeToSeconds('2:15.0')).toBe(135);
      expect(parseTimeToSeconds('1:30.5')).toBe(90.5);
    });

    it('should parse hh:mm:ss.d format', () => {
      expect(parseTimeToSeconds('1:00:00.0')).toBe(3600);
      expect(parseTimeToSeconds('1:23:45.5')).toBe(5025.5);
    });

    it('should parse ss.d format', () => {
      expect(parseTimeToSeconds('45.5')).toBe(45.5);
      expect(parseTimeToSeconds('120.0')).toBe(120);
    });

    it('should return null for invalid input', () => {
      expect(parseTimeToSeconds('')).toBe(null);
      expect(parseTimeToSeconds('invalid')).toBe(null);
      expect(parseTimeToSeconds('-1:00.0')).toBe(null);
    });

    it('should handle edge cases', () => {
      expect(parseTimeToSeconds('0:00.0')).toBe(0);
      expect(parseTimeToSeconds('59:59.9')).toBe(3599.9);
    });
  });

  describe('formatSecondsToTime', () => {
    it('should format seconds to mm:ss.d', () => {
      expect(formatSecondsToTime(135, 1)).toBe('2:15.0');
      expect(formatSecondsToTime(90.5, 1)).toBe('1:30.5');
    });

    it('should format seconds to hh:mm:ss.d when >= 1 hour', () => {
      expect(formatSecondsToTime(3600, 1)).toBe('1:00:00.0');
      expect(formatSecondsToTime(5025.5, 1)).toBe('1:23:45.5');
    });

    it('should handle different decimal places', () => {
      expect(formatSecondsToTime(135.567, 2)).toBe('2:15.57');
      expect(formatSecondsToTime(135.567, 0)).toBe('2:15');
    });

    it('should handle edge cases', () => {
      expect(formatSecondsToTime(0, 1)).toBe('0:00.0');
      expect(formatSecondsToTime(-10, 1)).toBe('0:00.0');
    });
  });
});
