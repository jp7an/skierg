import {
  calculateWatts,
  calculateWattsPerKg,
  calculateTempoPer500m,
  determineStartGroup,
  parseTimeToSeconds,
  formatTime,
} from '@/lib/calculator';

describe('Calculator Functions', () => {
  describe('calculateWatts', () => {
    it('should calculate watts from 5k time correctly', () => {
      // Example: 5000m in 1170 seconds (19:30)
      // Per 500m: 117 seconds
      // W = 2.80 / (117/500)^3 = 2.80 / 0.0128 ≈ 218.5W
      const time5k = 1170; // 19:30
      const watts = calculateWatts(time5k);
      
      // Should be around 218.5 watts based on formula
      expect(watts).toBeCloseTo(218.5, 0);
    });
  });

  describe('calculateWattsPerKg', () => {
    it('should calculate W/kg correctly', () => {
      const watts = 175;
      const weight = 75;
      const wattsPerKg = calculateWattsPerKg(watts, weight);
      
      expect(wattsPerKg).toBeCloseTo(2.33, 2);
    });
  });

  describe('calculateTempoPer500m', () => {
    it('should calculate tempo per 500m correctly', () => {
      const time5k = 1170; // 19:30
      const tempo = calculateTempoPer500m(time5k);
      
      expect(tempo).toBe(117); // 117 seconds per 500m
    });
  });

  describe('determineStartGroup', () => {
    it('should return Elit for high W/kg with liten experience', () => {
      const group = determineStartGroup(3.5, 'liten');
      expect(group).toBe('Elit');
    });

    it('should return correct group for medium W/kg with okej experience', () => {
      const group = determineStartGroup(2.5, 'okej');
      // 2.5 is >= 2.31 for group 4, but < 2.51 for group 3
      // So should be group 4
      expect(group).toBe('4');
    });

    it('should return group 9 for low W/kg', () => {
      const group = determineStartGroup(1.0, 'okej');
      expect(group).toBe('9');
    });

    it('should use different thresholds based on experience', () => {
      const wattsPerKg = 2.5;
      
      const groupLiten = determineStartGroup(wattsPerKg, 'liten');
      const groupOkej = determineStartGroup(wattsPerKg, 'okej');
      const groupStor = determineStartGroup(wattsPerKg, 'stor');
      
      // With liten (lower thresholds), should qualify for higher group
      // With stor (higher thresholds), should be in lower group
      expect(groupLiten).not.toBe(groupStor);
    });
  });

  describe('parseTimeToSeconds', () => {
    it('should parse MM:SS format correctly', () => {
      expect(parseTimeToSeconds('19:30')).toBe(1170);
      expect(parseTimeToSeconds('20:00')).toBe(1200);
      expect(parseTimeToSeconds('15:45')).toBe(945);
    });

    it('should parse MM:SS.ms format correctly', () => {
      expect(parseTimeToSeconds('19:30.5')).toBe(1170.5);
    });

    it('should return null for invalid formats', () => {
      expect(parseTimeToSeconds('invalid')).toBeNull();
      expect(parseTimeToSeconds('19')).toBeNull();
      expect(parseTimeToSeconds('19:60')).toBeNull();
      expect(parseTimeToSeconds('-1:30')).toBeNull();
    });
  });

  describe('formatTime', () => {
    it('should format seconds to MM:SS format', () => {
      expect(formatTime(117)).toBe('1:57.0');
      expect(formatTime(1170)).toBe('19:30.0');
      expect(formatTime(945)).toBe('15:45.0');
    });
  });
});
