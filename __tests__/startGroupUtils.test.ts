import { determineStartGroup, calculateStartled, START_GROUPS } from '../lib/startGroupUtils';

describe('startGroupUtils', () => {
  describe('determineStartGroup', () => {
    it('should return Elit for high W/kg', () => {
      expect(determineStartGroup(4.0)).toBe('Elit');
      expect(determineStartGroup(3.64)).toBe('Elit');
    });

    it('should return correct groups for various W/kg values', () => {
      expect(determineStartGroup(3.12)).toBe('1');
      expect(determineStartGroup(2.82)).toBe('2');
      expect(determineStartGroup(2.51)).toBe('3');
      expect(determineStartGroup(2.31)).toBe('4');
      expect(determineStartGroup(2.17)).toBe('5');
    });

    it('should return Under 9 for very low W/kg', () => {
      expect(determineStartGroup(1.5)).toBe('Under 9');
      expect(determineStartGroup(1.0)).toBe('Under 9');
    });

    it('should handle boundary cases correctly', () => {
      // Just above threshold
      expect(determineStartGroup(3.13)).toBe('1');
      // Just below threshold
      expect(determineStartGroup(3.11)).toBe('2');
    });
  });

  describe('calculateStartled', () => {
    it('should calculate startled results correctly', () => {
      // Example: 75kg person completing 5000m in 20:00 (1200 seconds)
      const result = calculateStartled(75, 1200);
      
      expect(result).not.toBeNull();
      expect(result?.watts).toBeGreaterThan(0);
      expect(result?.wattsPerKg).toBeGreaterThan(0);
      expect(result?.paceSeconds).toBe(120); // 2:00/500m
      expect(result?.startGroup).toBeDefined();
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
  });

  describe('START_GROUPS', () => {
    it('should have groups in descending order by threshold', () => {
      for (let i = 0; i < START_GROUPS.length - 1; i++) {
        expect(START_GROUPS[i].threshold).toBeGreaterThan(START_GROUPS[i + 1].threshold);
      }
    });

    it('should have all expected groups', () => {
      const groupNames = START_GROUPS.map(g => g.name);
      expect(groupNames).toContain('Elit');
      expect(groupNames).toContain('1');
      expect(groupNames).toContain('9');
    });
  });
});
