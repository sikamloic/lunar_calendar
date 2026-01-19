/**
 * Tests de validation contre le document de référence manuscrit
 * Décembre 2025 - Janvier 2026
 * 
 * Source: Document manuscrit Fezan traditionnel du Bénin
 * Le jour 1 (Mêdjo) commence le 20 décembre 2025 à 2H43
 */
import { describe, it, expect } from 'vitest';
import { getLunarDayInfo } from '../calculations';

/**
 * Données complètes du document manuscrit
 * Format: [jour calendrier, mois, jour lunaire, direction attendue, remarque]
 */
const REFERENCE_DATA: Array<{
  day: number;
  month: number;
  year: number;
  lunarDay: number;
  direction: string | null;
  remark?: string;
}> = [
  // Décembre 2025
  { day: 20, month: 12, year: 2025, lunarDay: 1, direction: 'Sud', remark: '2H43' },
  { day: 21, month: 12, year: 2025, lunarDay: 2, direction: 'Nord-Ouest' },
  { day: 22, month: 12, year: 2025, lunarDay: 3, direction: 'Est', remark: 'Ne rien' },
  { day: 23, month: 12, year: 2025, lunarDay: 4, direction: 'Nord' },
  { day: 24, month: 12, year: 2025, lunarDay: 5, direction: 'Nord-Est', remark: 'Ne rien' },
  { day: 25, month: 12, year: 2025, lunarDay: 6, direction: 'Est', remark: 'Ne rien' },
  { day: 26, month: 12, year: 2025, lunarDay: 7, direction: null },
  { day: 27, month: 12, year: 2025, lunarDay: 8, direction: 'Ouest' },
  { day: 28, month: 12, year: 2025, lunarDay: 9, direction: 'Sud' },
  { day: 29, month: 12, year: 2025, lunarDay: 10, direction: 'Nord-Ouest' },
  { day: 30, month: 12, year: 2025, lunarDay: 11, direction: 'Ouest' },
  { day: 31, month: 12, year: 2025, lunarDay: 12, direction: 'Nord' },
  // Janvier 2026
  { day: 1, month: 1, year: 2026, lunarDay: 13, direction: 'Nord', remark: 'Ne rien' },
  { day: 2, month: 1, year: 2026, lunarDay: 14, direction: 'Sud-Est' },
  { day: 3, month: 1, year: 2026, lunarDay: 15, direction: 'Nord-Est' },
  { day: 4, month: 1, year: 2026, lunarDay: 16, direction: 'Sud' },
  { day: 5, month: 1, year: 2026, lunarDay: 17, direction: 'Nord-Ouest' },
  { day: 6, month: 1, year: 2026, lunarDay: 18, direction: 'Sud-Ouest' },
  { day: 7, month: 1, year: 2026, lunarDay: 19, direction: 'Ouest' },
  { day: 8, month: 1, year: 2026, lunarDay: 20, direction: 'Nord' },
  { day: 9, month: 1, year: 2026, lunarDay: 21, direction: 'Est' },
  { day: 10, month: 1, year: 2026, lunarDay: 22, direction: 'Sud-Est' },
  { day: 11, month: 1, year: 2026, lunarDay: 23, direction: 'Nord-Est' },
  { day: 12, month: 1, year: 2026, lunarDay: 24, direction: 'Sud', remark: 'Ne rien' },
  { day: 13, month: 1, year: 2026, lunarDay: 25, direction: 'Ouest', remark: 'Ne rien' },
  { day: 14, month: 1, year: 2026, lunarDay: 26, direction: 'Sud-Ouest' },
  { day: 15, month: 1, year: 2026, lunarDay: 27, direction: 'Nord-Ouest' },
  { day: 16, month: 1, year: 2026, lunarDay: 28, direction: 'Est' },
  { day: 17, month: 1, year: 2026, lunarDay: 29, direction: 'Sud-Est' },
  { day: 18, month: 1, year: 2026, lunarDay: 30, direction: 'Nord-Est', remark: 'Nouvelle lune 19H43' },
  // Nouveau cycle - Janvier 2026 (suite)
  { day: 19, month: 1, year: 2026, lunarDay: 1, direction: 'Sud' },
  { day: 20, month: 1, year: 2026, lunarDay: 2, direction: 'Nord-Ouest' },
  { day: 21, month: 1, year: 2026, lunarDay: 3, direction: 'Est', remark: 'Ne rien' },
  { day: 22, month: 1, year: 2026, lunarDay: 4, direction: 'Nord' },
  { day: 23, month: 1, year: 2026, lunarDay: 5, direction: 'Nord-Est', remark: 'Ne rien' },
];

describe('Validation complète contre référence manuscrite (Déc 2025 - Jan 2026)', () => {
  
  describe('Test de toutes les dates du document manuscrit', () => {
    REFERENCE_DATA.forEach((ref) => {
      const dateStr = `${ref.day}/${ref.month}/${ref.year}`;
      const directionStr = ref.direction || '(aucune)';
      
      it(`${dateStr} = jour ${ref.lunarDay}, direction ${directionStr}`, () => {
        const date = new Date(ref.year, ref.month - 1, ref.day, 12, 0, 0);
        const info = getLunarDayInfo(date);
        
        expect(info.lunarDay).toBe(ref.lunarDay);
        expect(info.direction).toBe(ref.direction);
      });
    });
  });

  describe('Vérification des jours clés', () => {
    it('20 décembre 2025 = jour 1 (début du cycle à 2H43)', () => {
      const info = getLunarDayInfo(new Date('2025-12-20T12:00:00'));
      expect(info.lunarDay).toBe(1);
      expect(info.direction).toBe('Sud');
    });

    it('18 janvier 2026 = jour 30 (nouvelle lune 19H43)', () => {
      const info = getLunarDayInfo(new Date('2026-01-18T12:00:00'));
      expect(info.lunarDay).toBe(30);
      expect(info.direction).toBe('Nord-Est');
    });

    it('19 janvier 2026 = jour 1 (nouveau cycle)', () => {
      const info = getLunarDayInfo(new Date('2026-01-19T12:00:00'));
      expect(info.lunarDay).toBe(1);
      expect(info.direction).toBe('Sud');
    });
  });
});
