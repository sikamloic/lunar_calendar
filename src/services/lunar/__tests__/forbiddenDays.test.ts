import { describe, it, expect } from 'vitest';
import { isForbiddenDay, getForbiddenDayReason, getAllForbiddenDays } from '../forbiddenDays';

describe('Forbidden Days', () => {
  describe('isForbiddenDay', () => {
    it('should identify known forbidden days', () => {
      // Test quelques jours interdits connus
      expect(isForbiddenDay(new Date('2025-01-01'))).toBe(true); // 1er janvier
      expect(isForbiddenDay(new Date('2025-01-02'))).toBe(true); // 2 janvier
      expect(isForbiddenDay(new Date('2025-12-01'))).toBe(true); // 1er décembre
    });

    it('should not identify regular days as forbidden', () => {
      expect(isForbiddenDay(new Date('2025-01-15'))).toBe(false);
      expect(isForbiddenDay(new Date('2025-06-15'))).toBe(false);
      expect(isForbiddenDay(new Date('2025-12-25'))).toBe(false);
    });

    it('should work across different years', () => {
      // Les jours interdits sont basés sur le mois/jour, pas l'année
      expect(isForbiddenDay(new Date('2024-01-01'))).toBe(true);
      expect(isForbiddenDay(new Date('2025-01-01'))).toBe(true);
      expect(isForbiddenDay(new Date('2026-01-01'))).toBe(true);
    });

    it('should use optimized Set lookup (performance test)', () => {
      const start = performance.now();
      
      // Test 1000 lookups
      for (let i = 0; i < 1000; i++) {
        isForbiddenDay(new Date('2025-06-15'));
      }
      
      const end = performance.now();
      const duration = end - start;
      
      // Should be very fast with Set (< 10ms for 1000 lookups)
      expect(duration).toBeLessThan(10);
    });
  });

  describe('getForbiddenDayReason', () => {
    it('should return reason for forbidden days', () => {
      const reason = getForbiddenDayReason(new Date('2025-01-01'));
      
      expect(reason).toBeTruthy();
      expect(typeof reason).toBe('string');
    });

    it('should return undefined for non-forbidden days', () => {
      const reason = getForbiddenDayReason(new Date('2025-06-15'));
      
      expect(reason).toBeUndefined();
    });
  });

  describe('getAllForbiddenDays', () => {
    it('should return 45 forbidden days', () => {
      const allDays = getAllForbiddenDays();
      
      expect(allDays).toHaveLength(45);
    });

    it('should have valid month and day values', () => {
      const allDays = getAllForbiddenDays();
      
      allDays.forEach(day => {
        expect(day.month).toBeGreaterThanOrEqual(1);
        expect(day.month).toBeLessThanOrEqual(12);
        expect(day.day).toBeGreaterThanOrEqual(1);
        expect(day.day).toBeLessThanOrEqual(31);
      });
    });

    it('should have reasons for all days', () => {
      const allDays = getAllForbiddenDays();
      
      allDays.forEach(day => {
        expect(day.reason).toBeTruthy();
      });
    });
  });
});
