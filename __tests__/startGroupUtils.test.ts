import { determineStartGroup, calculateStartled, START_GROUPS, SkiExperience } from '../lib/startGroupUtils';

describe('startGroupUtils', () => {
  describe('determineStartGroup', () => {
    it('should return Elit for high W/kg with okej experience', () => {
      expect(determineStartGroup(4.0, 'okej')).toBe('Elit');
      expect(determineStartGroup(3.64, 'okej')).toBe('Elit');
    });

    it('should return correct groups for various W/kg values with okej experience', () => {
      expect(determineStartGroup(3.12, 'okej')).toBe('1');
      expect(determineStartGroup(2.82, 'okej')).toBe('2');
      expect(determineStartGroup(2.51, 'okej')).toBe('3');
      expect(determineStartGroup(2.31, 'okej')).toBe('4');
      expect(determineStartGroup(2.17, 'okej')).toBe('5');
    });

    it('should return Under 9 for very low W/kg', () => {
      expect(determineStartGroup(1.5, 'okej')).toBe('Under 9');
      expect(determineStartGroup(1.0, 'okej')).toBe('Under 9');
    });

    it('should handle boundary cases correctly with okej experience', () => {
      // Just above threshold
      expect(determineStartGroup(3.13, 'okej')).toBe('1');
      // Just below threshold
      expect(determineStartGroup(3.11, 'okej')).toBe('2');
    });

    it('should handle different experience levels correctly', () => {
      // Same W/kg should give different groups for different experience levels
      const wkg = 3.0;
      expect(determineStartGroup(wkg, 'liten')).toBe('4'); // 3.0 < 3.08 but >= 2.84
      expect(determineStartGroup(wkg, 'okej')).toBe('2'); // 3.0 < 3.12 but >= 2.82
      expect(determineStartGroup(wkg, 'stor')).toBe('1'); // 3.0 >= 2.66 (stor threshold for group 1) but < 3.12 (stor threshold for Elit)
    });

    it('should default to okej experience when not specified', () => {
      expect(determineStartGroup(3.64)).toBe('Elit');
      expect(determineStartGroup(3.12)).toBe('1');
    });
  });

  describe('calculateStartled', () => {
    it('should calculate startled results correctly with okej experience', () => {
      // Example: 75kg person completing 5000m in 20:00 (1200 seconds)
      const result = calculateStartled(75, 1200, 'okej');
      
      expect(result).not.toBeNull();
      expect(result?.watts).toBeGreaterThan(0);
      expect(result?.wattsPerKg).toBeGreaterThan(0);
      expect(result?.paceSeconds).toBe(120); // 2:00/500m
      expect(result?.startGroup).toBeDefined();
      expect(result?.position).toBeDefined();
    });

    it('should return null for invalid inputs', () => {
      expect(calculateStartled(0, 1200)).toBe(null);
      expect(calculateStartled(75, 0)).toBe(null);
      expect(calculateStartled(-10, 1200)).toBe(null);
    });

    it('should calculate W/kg correctly', () => {
      const result = calculateStartled(100, 1000);
      expect(result).not.toBeNull();
      
      // Verify W/kg calculation
      const expectedWkg = result!.watts / 100;
      expect(result?.wattsPerKg).toBeCloseTo(expectedWkg, 2);
    });

    it('should handle different experience levels', () => {
      const weightKg = 75;
      const timeSeconds = 1200;
      
      const resultLiten = calculateStartled(weightKg, timeSeconds, 'liten');
      const resultOkej = calculateStartled(weightKg, timeSeconds, 'okej');
      const resultStor = calculateStartled(weightKg, timeSeconds, 'stor');
      
      expect(resultLiten).not.toBeNull();
      expect(resultOkej).not.toBeNull();
      expect(resultStor).not.toBeNull();
      
      // All should have same watts and wattsPerKg
      expect(resultLiten?.watts).toBe(resultOkej?.watts);
      expect(resultLiten?.wattsPerKg).toBe(resultOkej?.wattsPerKg);
      
      // But may have different start groups
      // (depending on the actual W/kg value and thresholds)
    });

    it('should default to okej experience when not specified', () => {
      const result = calculateStartled(75, 1200);
      const resultOkej = calculateStartled(75, 1200, 'okej');
      
      expect(result?.startGroup).toBe(resultOkej?.startGroup);
    });
  });

  describe('START_GROUPS', () => {
    it('should have groups in descending order by okej threshold', () => {
      for (let i = 0; i < START_GROUPS.length - 1; i++) {
        expect(START_GROUPS[i].thresholds.okej).toBeGreaterThan(START_GROUPS[i + 1].thresholds.okej);
      }
    });

    it('should have all expected groups', () => {
      const groupNames = START_GROUPS.map(g => g.name);
      expect(groupNames).toContain('Elit');
      expect(groupNames).toContain('1');
      expect(groupNames).toContain('9');
    });

    it('should have all three experience thresholds for each group', () => {
      START_GROUPS.forEach(group => {
        expect(group.thresholds.liten).toBeDefined();
        expect(group.thresholds.okej).toBeDefined();
        expect(group.thresholds.stor).toBeDefined();
      });
    });

    it('should have thresholds in order: stor < okej < liten', () => {
      START_GROUPS.forEach(group => {
        expect(group.thresholds.stor).toBeLessThan(group.thresholds.okej);
        expect(group.thresholds.okej).toBeLessThan(group.thresholds.liten);
      });
    });
  });
});
