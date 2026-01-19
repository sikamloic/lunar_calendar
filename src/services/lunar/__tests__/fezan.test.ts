import { describe, it, expect } from 'vitest';
import { getFezanDay, isFavorable, getFezanName, getFezanStatus } from '../fezan';

describe('Fezan Calculations', () => {
  describe('getFezanDay', () => {
    it('should return correct Fezan day for lunar day 1', () => {
      const fezan = getFezanDay(1);
      
      expect(fezan.name).toBe('Mêdjo');
      expect(fezan.dayNumber).toBe(1);
      expect(fezan.status).toBe('favorable');
    });

    it('should cycle correctly through 9 days', () => {
      const expectedNames = [
        'Mêdjo', 'Mêkou', 'Vodoun', 'Azon', 'Vo',
        'Akoue', 'Bô', 'Hin', 'Fâ'
      ];

      for (let i = 1; i <= 9; i++) {
        const fezan = getFezanDay(i);
        expect(fezan.name).toBe(expectedNames[i - 1]);
        expect(fezan.dayNumber).toBe(i);
      }
    });

    it('should repeat cycle after day 9', () => {
      const day1 = getFezanDay(1);
      const day10 = getFezanDay(10);
      const day19 = getFezanDay(19);

      expect(day1.name).toBe(day10.name);
      expect(day1.name).toBe(day19.name);
      expect(day1.status).toBe(day10.status);
    });

    it('should have correct favorable/unfavorable status', () => {
      const favorableDays = [1, 3, 5, 7, 9]; // Mêdjo, Vodoun, Vo, Bô, Fâ
      const unfavorableDays = [2, 4, 6, 8]; // Mêkou, Azon, Akoue, Hin

      favorableDays.forEach(day => {
        const fezan = getFezanDay(day);
        expect(fezan.status).toBe('favorable');
      });

      unfavorableDays.forEach(day => {
        const fezan = getFezanDay(day);
        expect(fezan.status).toBe('unfavorable');
      });
    });

    it('should have description and recommendation for all days', () => {
      for (let i = 1; i <= 9; i++) {
        const fezan = getFezanDay(i);
        
        expect(fezan.description).toBeTruthy();
        expect(fezan.description.length).toBeGreaterThan(0);
        expect(fezan.recommendation).toBeTruthy();
        expect(fezan.recommendation.length).toBeGreaterThan(0);
      }
    });
  });

  describe('isFavorable', () => {
    it('should correctly identify favorable days', () => {
      const medjo = getFezanDay(1);
      expect(isFavorable(medjo)).toBe(true);

      const mekou = getFezanDay(2);
      expect(isFavorable(mekou)).toBe(false);
    });
  });

  describe('getFezanName', () => {
    it('should return correct name for day number', () => {
      expect(getFezanName(1)).toBe('Mêdjo');
      expect(getFezanName(2)).toBe('Mêkou');
      expect(getFezanName(9)).toBe('Fâ');
    });

    it('should cycle correctly', () => {
      expect(getFezanName(10)).toBe('Mêdjo');
      expect(getFezanName(18)).toBe('Mêdjo');
    });
  });

  describe('getFezanStatus', () => {
    it('should return correct status for day number', () => {
      expect(getFezanStatus(1)).toBe('favorable');
      expect(getFezanStatus(2)).toBe('unfavorable');
    });
  });
});
