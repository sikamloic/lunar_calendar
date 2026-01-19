import { describe, it, expect } from 'vitest';
import { findPreviousNewMoon, findNextNewMoon, getNewMoonsForYear } from '../astronomy';

describe('Astronomy - Moon Phase Calculations', () => {
  describe('findPreviousNewMoon', () => {
    it('should find the new moon of January 2025', () => {
      // Nouvelle lune du 29 janvier 2025 à 12:36 UTC
      const date = new Date('2025-02-01T12:00:00Z');
      const newMoon = findPreviousNewMoon(date);
      
      expect(newMoon.getFullYear()).toBe(2025);
      expect(newMoon.getMonth()).toBe(0); // January
      expect(newMoon.getDate()).toBe(29);
      
      // Vérifier la précision (tolérance de 2 heures)
      const expectedTime = new Date('2025-01-29T12:36:00Z');
      const diffMinutes = Math.abs(newMoon.getTime() - expectedTime.getTime()) / (1000 * 60);
      expect(diffMinutes).toBeLessThan(120); // Moins de 2 heures d'écart
    });

    it('should find the correct new moon for December 2025', () => {
      // Nouvelle lune du 30 décembre 2025 à 22:27 UTC
      const date = new Date('2025-12-31T12:00:00Z');
      const newMoon = findPreviousNewMoon(date);
      
      expect(newMoon.getFullYear()).toBe(2025);
      expect(newMoon.getMonth()).toBe(11); // December
      expect(newMoon.getDate()).toBe(30);
    });

    it('should return the same day if date is a new moon', () => {
      const newMoonDate = new Date('2025-01-29T12:36:00Z');
      const result = findPreviousNewMoon(newMoonDate);
      
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(29);
    });

    it('should handle dates at year boundaries', () => {
      const date = new Date('2026-01-01T00:00:00Z');
      const newMoon = findPreviousNewMoon(date);
      
      // Should find the December 2025 new moon
      expect(newMoon.getFullYear()).toBe(2025);
      expect(newMoon.getMonth()).toBe(11);
    });
  });

  describe('findNextNewMoon', () => {
    it('should find the next new moon after a given date', () => {
      const date = new Date('2025-01-15T12:00:00Z');
      const nextNewMoon = findNextNewMoon(date);
      
      expect(nextNewMoon.getFullYear()).toBe(2025);
      expect(nextNewMoon.getMonth()).toBe(0);
      expect(nextNewMoon.getDate()).toBe(29);
    });

    it('should find the next new moon when current date is a new moon', () => {
      const newMoonDate = new Date('2025-01-29T12:36:00Z');
      const nextNewMoon = findNextNewMoon(newMoonDate);
      
      // Should find February new moon
      expect(nextNewMoon.getFullYear()).toBe(2025);
      expect(nextNewMoon.getMonth()).toBe(1); // February
    });
  });

  describe('getNewMoonsForYear', () => {
    it('should return 12 or 13 new moons for a year', () => {
      const newMoons = getNewMoonsForYear(2025);
      
      // A year typically has 12 or 13 new moons
      expect(newMoons.length).toBeGreaterThanOrEqual(12);
      expect(newMoons.length).toBeLessThanOrEqual(13);
    });

    it('should return new moons in chronological order', () => {
      const newMoons = getNewMoonsForYear(2025);
      
      for (let i = 1; i < newMoons.length; i++) {
        expect(newMoons[i].getTime()).toBeGreaterThan(newMoons[i - 1].getTime());
      }
    });

    it('should return all new moons within the specified year', () => {
      const newMoons = getNewMoonsForYear(2025);
      
      newMoons.forEach(newMoon => {
        expect(newMoon.getFullYear()).toBe(2025);
      });
    });
  });
});
