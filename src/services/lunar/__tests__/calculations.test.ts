import { describe, it, expect } from 'vitest';
import { 
  getLunarDayOfMonth, 
  getMoonPhase, 
  isNewMoon, 
  isFullMoon,
  getLunarDayInfo,
  getMonthLunarInfo 
} from '../calculations';
import { LunarCalculationError } from '../errors';

describe('Lunar Calculations', () => {
  describe('getLunarDayOfMonth', () => {
    it('should return 1 for a new moon day', () => {
      // 29 janvier 2025 est une nouvelle lune
      const newMoonDate = new Date('2025-01-29T12:00:00Z');
      const lunarDay = getLunarDayOfMonth(newMoonDate);
      
      expect(lunarDay).toBe(1);
    });

    it('should calculate correct lunar day for dates after new moon', () => {
      // 29 janvier 2025 = jour 1
      // 30 janvier 2025 = jour 2
      const date = new Date('2025-01-30T12:00:00Z');
      const lunarDay = getLunarDayOfMonth(date);
      
      expect(lunarDay).toBe(2);
    });

    it('should return values between 1 and 30', () => {
      const dates = [
        new Date('2025-01-29'),
        new Date('2025-02-15'),
        new Date('2025-03-10'),
        new Date('2025-06-20'),
        new Date('2025-12-15'),
      ];

      dates.forEach(date => {
        const lunarDay = getLunarDayOfMonth(date);
        expect(lunarDay).toBeGreaterThanOrEqual(1);
        expect(lunarDay).toBeLessThanOrEqual(30);
      });
    });

    it('should throw error for invalid dates', () => {
      const invalidDate = new Date('invalid');
      
      expect(() => getLunarDayOfMonth(invalidDate)).toThrow(LunarCalculationError);
    });

    it('should throw error for dates out of range', () => {
      const tooOld = new Date('1800-01-01');
      const tooNew = new Date('2200-01-01');
      
      expect(() => getLunarDayOfMonth(tooOld)).toThrow(LunarCalculationError);
      expect(() => getLunarDayOfMonth(tooNew)).toThrow(LunarCalculationError);
    });
  });

  describe('getMoonPhase', () => {
    it('should return "new" for new moon dates', () => {
      const newMoonDate = new Date('2025-01-29T12:00:00Z');
      const phase = getMoonPhase(newMoonDate);
      
      expect(phase).toBe('new');
    });

    it('should return valid moon phase types', () => {
      const validPhases = [
        'new',
        'waxing-crescent',
        'first-quarter',
        'waxing-gibbous',
        'full',
        'waning-gibbous',
        'last-quarter',
        'waning-crescent'
      ];

      const date = new Date('2025-06-15');
      const phase = getMoonPhase(date);
      
      expect(validPhases).toContain(phase);
    });
  });

  describe('isNewMoon and isFullMoon', () => {
    it('should correctly identify new moon', () => {
      const newMoonDate = new Date('2025-01-29T12:00:00Z');
      
      expect(isNewMoon(newMoonDate)).toBe(true);
      expect(isFullMoon(newMoonDate)).toBe(false);
    });

    it('should not identify regular days as new or full moon', () => {
      const regularDate = new Date('2025-02-10T12:00:00Z');
      
      expect(isNewMoon(regularDate)).toBe(false);
      expect(isFullMoon(regularDate)).toBe(false);
    });
  });

  describe('getLunarDayInfo', () => {
    it('should return complete lunar day information', () => {
      const date = new Date('2025-02-15T12:00:00Z');
      const info = getLunarDayInfo(date);
      
      expect(info).toHaveProperty('date');
      expect(info).toHaveProperty('gregorianDay');
      expect(info).toHaveProperty('gregorianMonth');
      expect(info).toHaveProperty('gregorianYear');
      expect(info).toHaveProperty('dayOfWeek');
      expect(info).toHaveProperty('lunarDay');
      expect(info).toHaveProperty('fezan');
      expect(info).toHaveProperty('direction');
      expect(info).toHaveProperty('moonPhase');
      expect(info).toHaveProperty('isNewMoon');
      expect(info).toHaveProperty('isFullMoon');
      expect(info).toHaveProperty('isForbiddenDay');
    });

    it('should have valid Fezan information', () => {
      const date = new Date('2025-02-15');
      const info = getLunarDayInfo(date);
      
      expect(info.fezan).toHaveProperty('name');
      expect(info.fezan).toHaveProperty('dayNumber');
      expect(info.fezan).toHaveProperty('status');
      expect(info.fezan).toHaveProperty('description');
      expect(info.fezan).toHaveProperty('recommendation');
      
      expect(info.fezan.dayNumber).toBeGreaterThanOrEqual(1);
      expect(info.fezan.dayNumber).toBeLessThanOrEqual(9);
      expect(['favorable', 'unfavorable']).toContain(info.fezan.status);
    });

    it('should use cache for repeated calls', () => {
      const date = new Date('2025-02-15');
      
      const info1 = getLunarDayInfo(date);
      const info2 = getLunarDayInfo(date);
      
      // Should return the same cached object
      expect(info1).toBe(info2);
    });

    it('should throw error for invalid dates', () => {
      const invalidDate = new Date('invalid');
      
      expect(() => getLunarDayInfo(invalidDate)).toThrow(LunarCalculationError);
    });
  });

  describe('getMonthLunarInfo', () => {
    it('should return correct number of days for a month', () => {
      const januaryInfo = getMonthLunarInfo(2025, 1);
      expect(januaryInfo).toHaveLength(31);
      
      const februaryInfo = getMonthLunarInfo(2025, 2);
      expect(februaryInfo).toHaveLength(28);
      
      const aprilInfo = getMonthLunarInfo(2025, 4);
      expect(aprilInfo).toHaveLength(30);
    });

    it('should handle leap years correctly', () => {
      const feb2024 = getMonthLunarInfo(2024, 2);
      expect(feb2024).toHaveLength(29); // 2024 is a leap year
    });

    it('should return days in correct order', () => {
      const monthInfo = getMonthLunarInfo(2025, 6);
      
      for (let i = 0; i < monthInfo.length; i++) {
        expect(monthInfo[i].gregorianDay).toBe(i + 1);
      }
    });

    it('should throw error for invalid month', () => {
      expect(() => getMonthLunarInfo(2025, 0)).toThrow(LunarCalculationError);
      expect(() => getMonthLunarInfo(2025, 13)).toThrow(LunarCalculationError);
    });

    it('should throw error for invalid year', () => {
      expect(() => getMonthLunarInfo(1800, 1)).toThrow(LunarCalculationError);
      expect(() => getMonthLunarInfo(2200, 1)).toThrow(LunarCalculationError);
    });
  });
});
