import SunCalc from 'suncalc';
import type { MoonPhase, LunarDayInfo } from './types';
import { getFezanDay } from './fezan';
import { getDirection } from './directions';
import { isForbiddenDay } from './forbiddenDays';
import { findPreviousNewMoon } from './astronomy';
import { validateDate, validateYear, validateMonth } from './validation';
import { lunarDayCache, dateToKey } from './cache';
import { LunarCalculationError } from './errors';

/**
 * Jours de la semaine en français
 */
const DAYS_OF_WEEK = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
] as const;

/**
 * Note: findPreviousNewMoon is now imported from './astronomy'
 * Uses Meeus algorithm for high precision (~2 minutes accuracy)
 */

/**
 * Date de référence connue du calendrier Fezan traditionnel
 * Source: Document manuscrit Fezan (Déc 2025 - Jan 2026)
 * 
 * Le 20 décembre 2025 = Jour lunaire 1 (Mêdjo) à 2H43
 * Cette date sert de point d'ancrage pour calculer tous les autres jours.
 */
const FEZAN_REFERENCE_DATE = new Date(2025, 11, 20); // 20 décembre 2025
const FEZAN_REFERENCE_LUNAR_DAY = 1;
const LUNAR_CYCLE_LENGTH = 30;

/**
 * Calcule le jour du mois lunaire (1-30) pour une date donnée
 * 
 * Méthode: Utilise une date de référence connue du calendrier Fezan traditionnel
 * et calcule le décalage en jours, puis applique le cycle de 30 jours.
 * 
 * Référence: Document manuscrit Fezan (Déc 2025 - Jan 2026)
 * - 20 décembre 2025 = jour 1 (Mêdjo) à 2H43
 * - 21 décembre 2025 = jour 2 (Mêkou)
 * - ...
 * - 18 janvier 2026 = jour 30 (nouvelle lune 19H43)
 * - 19 janvier 2026 = jour 1 (Mêdjo) - nouveau cycle
 */
export function getLunarDayOfMonth(date: Date): number {
  validateDate(date);
  
  try {
    // Normaliser les dates à minuit pour comparer les jours
    const dateNormalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const refNormalized = new Date(FEZAN_REFERENCE_DATE.getFullYear(), FEZAN_REFERENCE_DATE.getMonth(), FEZAN_REFERENCE_DATE.getDate());
    
    // Calculer le nombre de jours depuis la date de référence
    const diffTime = dateNormalized.getTime() - refNormalized.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculer le jour lunaire en utilisant le cycle de 30 jours
    // La référence est jour 1, donc on ajoute diffDays et on applique modulo 30
    let lunarDay = ((FEZAN_REFERENCE_LUNAR_DAY - 1 + diffDays) % LUNAR_CYCLE_LENGTH) + 1;
    
    // Gérer les nombres négatifs (dates avant la référence)
    if (lunarDay <= 0) {
      lunarDay += LUNAR_CYCLE_LENGTH;
    }
    
    return lunarDay;
  } catch (error) {
    if (error instanceof LunarCalculationError) {
      throw error;
    }
    throw new LunarCalculationError(
      'Failed to calculate lunar day of month',
      date,
      error
    );
  }
}

/**
 * Détermine la phase lunaire à partir de l'illumination
 */
export function getMoonPhase(date: Date): MoonPhase {
  const illumination = SunCalc.getMoonIllumination(date);
  const phase = illumination.phase;
  
  // Phase va de 0 à 1:
  // 0 = nouvelle lune
  // 0.25 = premier quartier
  // 0.5 = pleine lune
  // 0.75 = dernier quartier
  
  if (phase < 0.025 || phase >= 0.975) return 'new';
  if (phase < 0.225) return 'waxing-crescent';
  if (phase < 0.275) return 'first-quarter';
  if (phase < 0.475) return 'waxing-gibbous';
  if (phase < 0.525) return 'full';
  if (phase < 0.725) return 'waning-gibbous';
  if (phase < 0.775) return 'last-quarter';
  return 'waning-crescent';
}

/**
 * Vérifie si c'est une nouvelle lune
 */
export function isNewMoon(date: Date): boolean {
  const illumination = SunCalc.getMoonIllumination(date);
  return illumination.phase < 0.02 || illumination.phase > 0.98;
}

/**
 * Vérifie si c'est une pleine lune
 */
export function isFullMoon(date: Date): boolean {
  const illumination = SunCalc.getMoonIllumination(date);
  return illumination.phase > 0.48 && illumination.phase < 0.52;
}

/**
 * Formate l'heure d'une date
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Calcule toutes les informations lunaires pour une date donnée
 * Uses cache for performance optimization
 */
export function getLunarDayInfo(date: Date): LunarDayInfo {
  validateDate(date);
  
  const cacheKey = dateToKey(date);
  
  return lunarDayCache.getOrCompute(cacheKey, () => {
    try {
      const lunarDay = getLunarDayOfMonth(date);
      const fezan = getFezanDay(lunarDay);
      const direction = getDirection(lunarDay);
      const moonPhase = getMoonPhase(date);
      const newMoonCheck = isNewMoon(date);
      const fullMoonCheck = isFullMoon(date);
      
      let newMoonTime: string | undefined;
      if (newMoonCheck) {
        const exactNewMoon = findPreviousNewMoon(date);
        newMoonTime = formatTime(exactNewMoon);
      }
      
      return {
        date: new Date(date),
        gregorianDay: date.getDate(),
        gregorianMonth: date.getMonth() + 1,
        gregorianYear: date.getFullYear(),
        dayOfWeek: DAYS_OF_WEEK[date.getDay()],
        lunarDay,
        fezan,
        direction,
        moonPhase,
        isNewMoon: newMoonCheck,
        isFullMoon: fullMoonCheck,
        isForbiddenDay: isForbiddenDay(date),
        newMoonTime,
      };
    } catch (error) {
      if (error instanceof LunarCalculationError) {
        throw error;
      }
      throw new LunarCalculationError(
        'Failed to calculate lunar day info',
        date,
        error
      );
    }
  });
}

/**
 * Génère les informations lunaires pour un mois entier
 */
export function getMonthLunarInfo(year: number, month: number): LunarDayInfo[] {
  validateYear(year);
  validateMonth(month);
  
  try {
    const result: LunarDayInfo[] = [];
    const daysInMonth = new Date(year, month, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day, 12, 0, 0);
      result.push(getLunarDayInfo(date));
    }
    
    return result;
  } catch (error) {
    throw new LunarCalculationError(
      `Failed to calculate lunar info for ${year}-${month}`,
      new Date(year, month - 1, 1),
      error
    );
  }
}

/**
 * Génère les informations lunaires pour une année entière
 */
export function getYearLunarInfo(year: number): LunarDayInfo[][] {
  validateYear(year);
  
  try {
    const result: LunarDayInfo[][] = [];
    
    for (let month = 1; month <= 12; month++) {
      result.push(getMonthLunarInfo(year, month));
    }
    
    return result;
  } catch (error) {
    throw new LunarCalculationError(
      `Failed to calculate lunar info for year ${year}`,
      new Date(year, 0, 1),
      error
    );
  }
}
